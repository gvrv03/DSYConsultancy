import React from 'react'

const MarquHome = () => {
  return (
    <section className="w-full bg-white ">
    <div className="container mt-14 px-5 m-auto ">
      <i className="bi font-bold text-2xl justify-start items-center py-5 bi-megaphone-fill flex">
        <marquee
          direction="right"
          scrollamount="12"
          className="px-5 text-base"
        >
          Admission for Direct second Year will be started{" "}
          <span className="ml-5 ">
            <a href="/Home " className="cursor-pointer z-50">
              Click Here
            </a>
          </span>
        </marquee>
      </i>
    </div>
  </section>
  )
}

export default MarquHome
