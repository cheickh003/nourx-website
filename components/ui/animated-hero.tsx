"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["innovante", "moderne", "agile", "digitale", "performante"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 sm:gap-8 items-center justify-center flex-col text-center max-w-6xl mx-auto">
          <div className="flex gap-6 flex-col">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter text-center font-regular leading-tight px-2">
              <span className="text-nourx-black block sm:inline">Votre transformation</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center h-10 xs:h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 items-center mt-2 sm:mt-0">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-nourx-blue whitespace-nowrap text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed tracking-tight text-nourx-gray-600 max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center px-2 sm:px-4">
              Du conseil stratégique à l'exploitation 24/7, nous accompagnons les entreprises 
              africaines dans leur transformation digitale avec des solutions sur-mesure et une expertise locale reconnue.
            </p>

            {/* Stats rapides */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 text-xs sm:text-sm text-nourx-gray-700">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-nourx-blue">80+</span>
                <span>Projets livrés</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-nourx-blue">35+</span>
                <span>Clients satisfaits</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-nourx-blue">4</span>
                <span>Pays couverts</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-none sm:w-auto px-4 sm:px-0">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="gap-2 sm:gap-3 w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4" variant="outline">
                Discuter de votre projet <PhoneCall className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="gap-2 sm:gap-3 w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4">
                Commencer maintenant <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };