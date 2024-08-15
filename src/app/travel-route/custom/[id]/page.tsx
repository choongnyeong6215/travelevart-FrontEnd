"use client";

import useGetDetailCustomData from "@/app/hooks/custom/useGetCustomData";
import LoadingModal from "@/app/ui/common/LoadingModal";
import CustomSearch from "@/app/ui/customTravel/CustomSearch";
import TodoLibraryExample from "@/app/ui/customTravel/DragAndDrop";
import { ITravelDetail, ITravelItem } from "@/lib/types";
import { RootState } from "@/redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface ITravelCustomData {
  travel_name: string;
  travelroute_range: number;
  start_date: string;
  end_date: string;
}

export type ITravelItems = {
  [date: string]: ITravelDetail[];
};

export default function DetailCustomPage({
  params,
}: {
  params: { id: string };
}) {
  const [items, setItems] = useState<ITravelItems>({});
  const { data, isLoading } = useGetDetailCustomData(params.id);
  const [openSearch, setOpenSearch] = useState(false);

  // setup 페이지에서 설정한 옵션 불러오기
  const travelRoute = useSelector((state: RootState) => state.travelRoute);

  const dateRange = generateDateRange(
    travelRoute.startDate,
    travelRoute.endDate,
  );

  function transformData(apiResponse: { items: ITravelItem[] }): ITravelItems {
    const transformed: ITravelItems = {};
    apiResponse.items.forEach((item) => {
      transformed[item.date] = item.details;
    });
    return transformed;
  }

  function generateDateRange(startDate: string, endDate: string): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    let currentDate = start;
    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  useEffect(() => {
    // 데이터를 변환하고 상태를 초기화
    if (data) {
      const transformedItems = transformData(data);
      setItems(transformedItems);
    }
  }, [data]);

  useEffect(() => {
    // dateRange가 변경될 때만 상태를 초기화
    if (Object.keys(items).length === 0 && dateRange.length > 0) {
      const initialItems: ITravelItems = {};
      dateRange.forEach((date) => {
        initialItems[date] = [];
      });
      setItems(initialItems);
    }
  }, [dateRange]);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="flex relative justify-center bg-gray-200">
      <TodoLibraryExample
        dateRange={dateRange}
        items={items}
        setItems={setItems}
        travelRouteBaseInfo={travelRoute}
        setOpenSearch={setOpenSearch}
      />
      <CustomSearch
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        items={items}
        setItems={setItems}
      />
    </div>
  );
}
