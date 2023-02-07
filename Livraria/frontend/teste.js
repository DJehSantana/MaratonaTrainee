
function buscarLivros() {
    fetch('http://localhost:3000/book', {
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(response => {
        var coluna = document.getElementById('coluna');
        let campos = '';
        response.forEach(livro => {
            campos += `
                <tr>
                    <td>${livro.id}</td>
                    <td>${livro.title}</td>
                    <td>${livro.release_date}</td>
                    <td>${livro.publisher}</td>
                </tr> 
                `
        });
        coluna.innerHTML = campos;
    });
}
