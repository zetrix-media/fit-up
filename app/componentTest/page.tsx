// pages/index.jsx
import HeroSlider from '@/components/HeroSection';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Medical Uniforms</title>
        <meta name="description" content="Premium Medical Uniforms for Everyday Heroes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HeroSlider />
        {/* Other content for your page */}
      </main>
    </div>
  );
}