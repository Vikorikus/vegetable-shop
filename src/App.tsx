import { Loader, SimpleGrid, Container, Center } from "@mantine/core";
import "./App.css";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const vegetData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json",
        );

        if (!response.ok) {
          throw new Error("Failed to load catalog");
        }
        const result = await response.json();
        setProducts(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    vegetData();
  }, []);

  return (
    <div className="app-wrapper">
      <header className="full-width-header">
        <div className="header-container">
          <Header />
        </div>
      </header>

      <Container size={1280} className="main-content">
        <main>
          <h2 className="catalog-title">Catalog</h2>

          {error && (
            <Center style={{ height: "20vh" }}>
              <p style={{ color: "red", fontWeight: 600 }}>Error: {error}</p>
            </Center>
          )}

          {isLoading ? (
            <div className="loader-container">
              <Loader color="green" size="xl" type="dots" />
            </div>
          ) : (
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={55}
              verticalSpacing={25}
            >
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>
          )}
        </main>
      </Container>
    </div>
  );
}

export default App;
