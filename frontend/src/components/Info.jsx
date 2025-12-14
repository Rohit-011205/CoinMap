import React from 'react'
import gradient from "../assets/gradient.png"
import iphone from "../assets/iphone.png"

function Info() {
    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 gap-24 flex flex-col md:flex-row mt-20 mb-50">
            <div className='w-full md:mt-12 md:w-1/2 order-2 lg:order-1'>
                <div className="h1 mt-16">
                    <h1 className='text-6xl font-bold leading-tight'>Having some craving of Bookish Knowledge {" "}
                    </h1>
                    <span className=' block mt-3 text-4xl md:text-5xl font-extrabold
            bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400
            bg-clip-text text-transparent '>
                        try Rcart Now !!!
                    </span>
                </div>
                <div className="mt-10 text-lg text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo veritatis sunt, porro vero consectetur vitae delectus repudiandae, possimus quas recusandae molestias ut in maiores eum atque corporis non reiciendis. Voluptatum, laboriosam eveniet.
                </div>
            </div>
            <div className="relative flex justify-center md:justify-end items-center md:order-1 lg:ml-80 pt-28">
                {/* Purple glowing circle BELOW image */}
                <div
                    className="
      absolute
      bottom-6
      w-[260px] h-[260px]
      bg-purple-500/40
      blur-3xl
      rounded-full
      -z-10 pt-28
    "
                ></div>

                {/* Floating Image */}
                <img
                    src={iphone}
                    alt="iphone"
                    className="
      w-[220px]
      sm:w-[240px]
      md:w-[280px]
      lg:w-[380px]
      h-auto
      drop-shadow-[0_30px_60px_rgba(168,85,247,0.45)]
      animate-float
    "
                />
            </div>



        </div>
    )
}

export default Info
