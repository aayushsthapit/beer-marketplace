const PRELOADER_ITEM_COUNT = 5;

const BeerItemPreloader = () => (
  <div className="beer-item--preloader border py-5 px-10 shadow rounded-md mx-auto my-3">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-slate-300 h-10 w-10"></div>
      <div className="flex-1 py-1">
        <div className="grid grid-cols-3 gap-8 py-2">
          <div className="h-2 bg-slate-300 rounded col-span-1"></div>
        </div>
        <div className="grid grid-cols-2 gap-8 py-2">
          <div className="h-2 bg-slate-300 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-300 rounded my-2"></div>
        <div className="h-2 bg-slate-300 rounded my-2"></div>
        <div className="h-2 bg-slate-300 rounded my-2"></div>
      </div>
    </div>
  </div>
);

export const BeerItemListPreloader = () => {
  return (
    <>
      {new Array(PRELOADER_ITEM_COUNT).fill(1).map(() => (
        <BeerItemPreloader />
      ))}
    </>
  );
};
