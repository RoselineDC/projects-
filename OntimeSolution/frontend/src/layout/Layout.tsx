import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

//  adding props to the layout component
interface Props {
  children: React.ReactNode;
}
// for layouts of common sections like header and footer of alll pages
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto py-10 flex-1">        
        { children}
      </div>
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
