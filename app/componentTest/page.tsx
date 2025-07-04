import ProductCard from '@/components/ProductCard';
import Head from 'next/head';

const HomePage: React.FC = () => {
  const productData = {
    imageUrl: '/assets/product_image.png', // This is the image you specified
    productTitle: 'Everybody Classic V',
    price: '35.99',
    colors: ['#000000', '#E5734E', '#FFB7D6', '#5C8C4C', '#6A9BE8', '#42429F', '#2C3A5A'], // Example colors from the image
  };

  return (
    <div>
      <Head>
        <title>Product Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
        <ProductCard {...productData} />
      </main>
    </div>
  );
};

export default HomePage;