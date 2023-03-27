import React from "react"

const Container: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="w-full max-w-screen-lg px-4 pt-24 overflow-hidden sm:px-8 lg:mx-auto">
    {children}
  </div>
)

export default Container
