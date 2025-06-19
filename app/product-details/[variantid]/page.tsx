import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductImageViewer from "@/components/ProductImageViewer";
import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { FaWhatsapp } from "react-icons/fa";

// interface PageProps {
//   params: {
//     variantid: string;
//   };
// }

export default async function ProductDetailsPage({ params }: { params: Promise<{ variantid: string }> }) {
  const resolvedParams = await params;
  const variantId = parseInt(resolvedParams.variantid);
  if (!variantId || isNaN(variantId)) return notFound();

  const supabase = await getSupabaseServerClient();

  const { data: variant, error } = await supabase
    .from("productvariants")
    .select("*, products(*)")
    .eq("variantid", variantId)
    .single();

  if (!variant || error) {
    console.error("Supabase error:", error);
    return notFound();
  }

  const availableSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const mockColors = ["#000000", "#ee5b39", "#de9bc0", "#c6ab7a", "#4a555d", "#012e66"];

  const productName = variant.products?.name ?? "Unknown Product";
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the product "${productName}" (Color: ${variant.color}, Size: ${variant.size})`
  );
  const whatsappLink = `https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`; // Replace with your WhatsApp number

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT: Images */}
        <div>
          <ProductImageViewer variantid={variantId} />
        </div>

        {/* RIGHT: Product Info */}
        <div className="space-y-6">
          <div className="text-sm text-gray-500">
            Home / Shop / {variant.products?.name ?? "Unknown Product"}
          </div>

          <h1 className="text-3xl font-semibold text-gray-900">
            {variant.products?.name ?? "Unknown Product"}
          </h1>

          <div className="flex items-center gap-2">
            <div className="text-yellow-400 text-xl">★★★★★</div>
            <span className="text-sm text-gray-500">(1 customer review)</span>
          </div>

          <div className="text-2xl font-bold text-gray-900">
            ${variant.price ? variant.price.toFixed(2) : "N/A"}
          </div>

          <p className="text-gray-700 leading-relaxed">
            A product short description is a concise and brief overview of a product, providing key
            information to potential customers. Typically, it highlights features, benefits, and
            characteristics of the product.
          </p>

          {/* Colors */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Color</h4>
            <div className="flex gap-3">
              {mockColors.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border-2 cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Size</h4>
            <div className="flex gap-2 flex-wrap">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded ${
                    size === variant.size
                      ? "bg-black text-white"
                      : "text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Enquiry Button */}
          <div className="flex items-center gap-4 mt-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 text-sm font-bold uppercase rounded text-white"
            >
              <FaWhatsapp size={18} />
              Enquiry
            </a>
          </div>

          <button className="text-sm text-gray-600 underline mt-2">Add to wishlist</button>

          {/* Extra details */}
          <div className="pt-6 space-y-1 text-sm text-gray-600">
            <div><strong>SKU:</strong> N/A</div>
            <div><strong>Categories:</strong> Jackets, Men, T-shirts</div>
            <div><strong>Tags:</strong> clothing, etc., fashion, m81, men, products</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
