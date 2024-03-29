import React, { FunctionComponent } from 'react';
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import Toggle from '../components/Toggle';
import { httpGet } from "../util/httpClient";
import Spinner from "../components/Spinner";

const Detail: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const getFromCache = (key: string) => {
    return queryClient.getQueryData([key]);
  };
  const { moviesId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [moviesId],
    queryFn: async () => {
      const cache = getFromCache(moviesId as string);
      if (cache) return cache;

      const data = await httpGet(`i=${moviesId}`);

      return data.data;
    },
  });

  if (isLoading) {
    return <Spinner />
  }

  const { Poster, Title, Year, Actors, Plot } = data;

  return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <div>
              <div className="w-full aspect-w-1 aspect-h-1">
                <img
                    src={Poster}
                    className="w-full h-full object-center object-cover sm:rounded-lg"
                    alt={Title}
                />
              </div>
            </div>
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <Toggle data={data}  />
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {Title}
              </h1>
              <div className="mt-3">
                <p className="text-3xl text-gray-900">{Year}</p>
              </div>
              <div className="mt-3">
                <p className="text-xl text-gray-900">{Actors}</p>
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="text-base text-gray-700 space-y-6">
                  <p>{Plot}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-between">{/* link back */}</div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Detail;
