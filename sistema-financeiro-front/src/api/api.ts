const API_URL = "http://localhost:5101";

export async function apiGet<T>(url:string): Promise <T> {
    const response = await fetch(`${API_URL}${url}`);

    if (!response.ok){
        throw new Error("Erro ao buscar dados");
    }


    return response.json();
}



export async function apiPost<T>(url:string, data:unknown): Promise<T> {
    const response =await fetch(`${API_URL}${url}` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if(!response.ok){
        throw new Error("Erro ao enviar dados");
    }

    return response.json();
}


export async function apiDelete(url: string) {
  const response = await fetch(`${API_URL}${url}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro no DELETE");
  }
}