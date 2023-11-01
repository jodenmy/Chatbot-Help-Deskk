const CHATGPT_KEY = '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';


hideLoading();

async function onClickSearch(){

    showLoading();

    let busqueda = document.getElementById('txtSearch').value;
    let containerHTML = document.getElementById('SearchResult');
    let prompt = getPrompt(busqueda);
    let response = await callToGpt(prompt);
    containerHTML.innerHTML = response;
    
  hideLoading();
}

async function callToGpt(prompt){
    const bodyRequest = {
        model: 'gpt-3.5-turbo',
        max_tokens: 500,
        messages: [
            {
               role: 'user', content: prompt}
        ],
        temperature: 0.7
    }
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHATGPT_KEY}`

        },
        body: JSON.stringify(bodyRequest)

    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', request);
    const json = await response.json();
    return json.choices[0].message.content;
    

}

function getPrompt(destino){

    return `Eres un experto en Help Desk propagas, necesito que identifiques los problema que tengo y le des una buena respuesta ${destino}.en cada punto desgloza un poco el detalle. Dame precision en tus respuestas, Es importante que no hagas ningun tipo de saludos o algo por el estilo, simplemente muestra la respuesta. `

}

function  showLoading(){
    document.getElementById('loading').hidden = false;

}


function hideLoading(){
    document.getElementById('loading').hidden = true;

}


