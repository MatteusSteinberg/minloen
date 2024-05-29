import axios, { AxiosError, AxiosRequestConfig } from "axios"
import _defaults from "lodash/defaults"
import { useCallback, useEffect, useMemo, useState } from "react"

export interface IRequestResult {
  data?: any,
  statusCode: number,
  error?: any
}

export const requestWithoutBody = async (url: string, method: "get" | "delete", config?: AxiosRequestConfig<any>): Promise<IRequestResult> => {
  try {
    const response = await axios[method](url, config)

    return {
      data: response.data,
      statusCode: response.status
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: error.response?.data,
        statusCode: error.status ?? 500
      }
    }
    console.error(error)
  }

  return {
    statusCode: 500
  }
}

export const requestWithBody = async (url: string, method: "put" | "patch" | "post", body: any, config?: AxiosRequestConfig<any>): Promise<IRequestResult> => {
  try {
    const response = await axios[method](url, body, config)

    return {
      data: response.data,
      statusCode: response.status
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      return {
        error: error.response?.data,
        statusCode: error.status ?? 500
      }
    }
    console.error(error)
  }

  return {
    statusCode: 500
  }
}

export interface IRequestData<T = any> {
  error?: any
  data?: T
  statusCode?: number
}

interface IUseApi {
  /** Start with /  */
  url: string,
  params?: any,
  id?: string,
  opts?: {
    autoGet?: boolean
  }
}
export const useAPI = <T>({ url, params, id, opts }: IUseApi) => {
  opts = {
    ...{
      autoGet: true
    },
    ...opts
  }

  url = `${process.env.REACT_APP_API || ''}/api${url}` + (id ? `/${id}` : "")

  const queryString = useMemo(() => {
    const qStr = new URLSearchParams(params || {}).toString().trim()
    return !!qStr && !!params ? `?${qStr}` : ""
  }, [params])

  const requestUrl = useMemo(() => {
    return url + queryString
  }, [queryString, url])

  const [requestData, setRequestData] = useState<IRequestData<T>>()
  const [loading, setLoading] = useState(false)

  const updateData = useCallback((result: IRequestResult) => {
    if (!result?.data && !result?.error) return
    setRequestData({
      data: result.data,
      error: result.error,
      statusCode: result.statusCode
    })
  }, [])

  const get = useCallback(async () => {
    setLoading(true)
    const result = await requestWithoutBody(requestUrl, "get")
    setLoading(false)
    updateData(result)
    return result
  }, [requestUrl, updateData])

  const create = async (body: any) => {
    setLoading(true)
    const result = await requestWithBody(requestUrl, "post", body)
    setLoading(false)
    updateData(result)
    return result
  }

  const update = async (body: any) => {
    setLoading(true)
    const result = await requestWithBody(requestUrl, "patch", body)
    setLoading(false)
    updateData(result)
    return result
  }

  const del = async () => {
    setLoading(true)
    const result = await requestWithoutBody(requestUrl, "delete")
    setLoading(false)
    updateData(result)
    return result
  }

  useEffect(() => {
    if (opts?.autoGet) {
      get()
    }
  }, [opts.autoGet, get])

  const mutate = async () => {
    await get()
  }

  const setData = useCallback((data: Partial<T> | undefined) => {
    setRequestData((r) => ({ ...r, data: !!r ? _defaults(data, r.data) : undefined }))
  }, [])

  return {
    data: requestData?.data,
    error: requestData?.error,
    setData,
    loading,
    get,
    create,
    update,
    mutate,
    del
  }
}