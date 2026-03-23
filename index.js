const express = require("express")
const app = express()

app.use(express.json())

let id = 2


const tarefas = [
    {
        id: 1,
        title: "Reunião de alinhamento",
        description: "Breve reunião de alinhamento dos novos produtos!",
        status: "EM ANDAMENTO"
    }
]

//Mostra todas as tarefas 
app.get("/tarefas", function(req, res){
    return res.json(tarefas)
})


//Mostra tarefas peloid escolhido
app.get("/tarefas/:id", function(req, res){
    const id = parseInt(req.params.id)

    const tarefa = tarefas.find(a => a.id == id)

    if(!tarefa){
        return res.json(tarefas)
    }else{
        res.status(404).json("tarefa não encontrada! tente novamente.")
    }



})

//Criar novas tarefas
app.post("/tarefas", function(req, res){

    const tituloDatarefa = req.body.title
    const descicaoDaTarefa = req.body.description
    const statusDaTarefa = req.body.status

    if(!tituloDatarefa){
        return res.status(400).json({erro:"O título da tarefa é obrigatório!"})
    }

    const novaTarefa={
        id:id++,
        title: tituloDatarefa,
        description: descicaoDaTarefa,
        status: statusDaTarefa
    }

    tarefas.push(novaTarefa)
    res.status(201).json("Tarefa criada com sucesso!")

})


//Atualiza tarefas já criadas 
app.put("/tarefas/:id", function(req, res){
    const id = parseInt(req.params.id)

    const{title, description, status} = req.body

    const indexDaTarefa = tarefas.findIndex( a => a.id == id)

    if(indexDaTarefa == -1){
        return res.status(404).json({erro:"Tarefa não encontrada"})
    }

    if(tarefas[indexDaTarefa].status === "CONCLUIDO"){
        res.status(400).json({erro: "A tarefa já está concluída e não pode ser alterada"})
    }

        tarefas[indexDaTarefa] .title = title
        tarefas[indexDaTarefa] .description = description
        tarefas[indexDaTarefa] .status = status
    
        return res.json(tarefas[indexDaTarefa])
})

app.delete("/tarefas/:id", function(req, res){
    const id = parseInt(req.params.id)
    const index = tarefas.findIndex(a => a.id === id)

    if(index == -1){
        return res.status(404).json("Tarefa não encontrada")
    }

    const tarefaDeletada = tarefas.splice(index, 1)

    return res.status(20).json("Tarefa deletada com sucesso!")
})


app.listen(3000, function(){
    console.log("Servidor rodando na porta 3000!")
})


