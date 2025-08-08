import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Shield, Truck, Zap } from 'lucide-react'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-4"
          >
            <Badge className="bg-blue-100 text-blue-700">Our Story</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              About <span className="text-blue-600">LaptopHub</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome to <span className="font-semibold text-foreground">LaptopHub</span> – your premier destination for high-performance laptops,
              unbeatable deals, and trusted support. We’re dedicated to providing you with the best technology for work, play, and everything in between.
            </p>
          </motion.div>
        </section>

        {/* Mission and Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full p-6 shadow-lg">
                <CardContent className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment</h2>
                  <div className="text-muted-foreground text-md space-y-4">
                    <p>
                      🎯 <strong>Our Mission:</strong> To empower every student, gamer, designer, and entrepreneur
                      by helping them find the perfect machine that meets their unique needs and aspirations.
                    </p>
                    <p>
                      🛠️ <strong>Top Brands:</strong> We meticulously select and partner with industry-leading brands like Dell, HP, ASUS, Lenovo, and Apple to bring
                      you a curated collection of laptops known for their quality, reliability, and innovation.
                    </p>
                    <p>
                      🚀 <strong>Exceptional Service:</strong> Every order is backed by a comprehensive 2-year warranty and includes complimentary, fast delivery anywhere in Algeria, ensuring peace of mind and convenience.
                    </p>
                    <p>
                      🤝 <strong>Customer Focus:</strong> We believe in building lasting relationships with our customers by offering unparalleled support and a seamless shopping experience from start to finish.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Placeholder for Map/Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full p-6 shadow-lg flex items-center justify-center">
                <CardContent className="w-full h-full flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Visit Our Store</h2>
                  <p className="text-muted-foreground text-center mb-6">
                    Drop by our physical store in Algiers for personalized service, hands-on testing, and exclusive in-store deals.
                  </p>
                  <div className="rounded-xl overflow-hidden shadow-lg h-[300px]">
                    <iframe
                      title="LaptopHub Store Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.9921873442457!2d3.059436815259529!3d36.75376887995671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fadf3b740b6ed%3A0x2a802d4b902c8f27!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2sdz!4v1691000000000!5m2!1sen!2sdz"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section (reused from HomePage for consistency) */}
        <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Why Choose LaptopHub?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the best laptop shopping experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Quality Guarantee",
                  description: "All laptops come with comprehensive warranty and quality assurance",
                },
                {
                  icon: Truck,
                  title: "Fast Delivery",
                  description: "Free shipping on all orders with express delivery options available",
                },
                {
                  icon: Zap,
                  title: "Expert Support",
                  description: "Our tech experts are here to help you find the perfect laptop",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-center space-y-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
