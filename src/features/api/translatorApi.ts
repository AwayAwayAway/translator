import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GlobalEndpoints, TranslatePageEndpoints } from '../../shared/endpoints/endpoints';
import { Dictionary, SelectItem, TranslatedTextInfo, TranslationResponse } from '../../models';
import { ZERO } from '../../shared/constants/constants';

export const translatorApi = createApi({
  reducerPath: 'translatorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: GlobalEndpoints.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', process.env.REACT_APP_KEY as string);
      headers.set('X-RapidAPI-Host', GlobalEndpoints.HOST);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLanguagesList: builder.query<SelectItem[], void>({
      query: () => ({
        url: TranslatePageEndpoints.LANGUAGES,
        params: { 'api-version': '3.0', scope: ['translation'] },
      }),
      transformResponse: (response: { translation: Dictionary }): SelectItem[] => {
        return Object.keys(response.translation).map((item: string) => ({
          label: response.translation[item as string].name,
          value: item,
        }));
      },
    }),
    sendTextToTranslate: builder.mutation<TranslatedTextInfo, { to: string; text: string }>({
      query: (payload) => ({
        url: TranslatePageEndpoints.TRANSLATE,
        params: { 'api-version': '3.0', to: payload.to },
        method: 'POST',
        body: [{ text: payload.text }],
      }),
      transformResponse: (response: TranslationResponse[]): TranslatedTextInfo => ({
        id: Math.random().toString(),
        translations: response[ZERO].translations[ZERO],
        detectedLanguage: response[ZERO].detectedLanguage,
      }),
    }),
  }),
});

export const { useGetLanguagesListQuery, useSendTextToTranslateMutation } = translatorApi;
