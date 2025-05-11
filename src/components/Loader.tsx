export const Loader: React.FC = () => {
  return (
    <div className={` flex items-center justify-center w-full opacity-0.50`}>
      <div className="flex justify-center items-center">
        <div
          className={`size-14 border-[8px] border-gray-200 border-solid rounded-full animate-spin
             border-t-[#A5FCDF] border-r-[#77F8D8] border-b-[#20E8DA] border-l-[#17C3C7]`}
        ></div>
      </div>
    </div>
  );
};
