export default function Loading() {
  return (
    <div className=" relative w-full z-50 bg-black grid place-items-center h-screen ">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
