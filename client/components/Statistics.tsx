import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  const statistics = [
    {
      number: "2+",
      label: "Years Experience",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/1025574977b3d8e43919aad48eaa3397010e003d?width=240",
    },
    {
      number: "99%",
      label: "Client Satisfaction",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/dd28f6850a7d468ec60fd5244664887f90918f33?width=240",
    },
    {
      number: "12+",
      label: "Project Delivered",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/a3d60aa6d4cfe1ac7f47e69287c96601af446ee6?width=240",
    },
  ];

  return (
    <section className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Proven Numbers. Real Impact.
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From shipped products to years of experience
            </p>
          </motion.div>

          {/* Desktop Layout */}
          <div className="hidden md:block space-y-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="flex items-center justify-between py-8 border-b border-gray-800 last:border-b-0"
              >
                <div className="flex items-center space-x-8">
                  <div className="text-6xl md:text-8xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-2xl md:text-3xl font-medium text-white">
                    {stat.label}
                  </div>
                </div>

                <div className="w-32 h-32 rounded-2xl overflow-hidden">
                  <img
                    src={stat.image}
                    alt={stat.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden grid grid-cols-1 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden">
                  <img
                    src={stat.image}
                    alt={stat.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-medium text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
