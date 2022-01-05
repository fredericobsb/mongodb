//como fazer insert 
db.Cliente.insertOne(
{
    codigo: 1,
    nome: 'JOSE DOS ANZOIS',
    dataNascimento: '2000-10-01'
}
)

//como fazer select
db.Cliente.find()

// alter table - copiou o codigo acima e acrescentou na tora a coluna cpf
db.Cliente.insertOne(
{
    codigo: 1,
    nome: 'JOSE DOS ANZOIS',
    dataNascimento: '2000-10-01',
    cpf: '111.111.111-11'
}
)

//inserindo varios registros de uma vez

db.Cliente.insertMany(
    [
        {
            codigo: 4,
            nome: 'ANA',
            cpf: '123.123.123-11'
        },
        {
            codigo: 5,
            nome: 'JOAO',
            cpf: '123.123.123-44'
        },
        {
            codigo: 6,
            nome: 'CARLOS',
            cpf: '123.123.666-11'
        }
    ]
)
       
// INSERINDO array de objetos - exemplo 1
db.Cliente.insertOne(
 {
    codigo: 11, nome: 'SR MARCELO', filhos: ['lu', 'gu', 'ma']
 }      
)

db.Cliente.find()      

// INSERINDO array de objetos - exemplo 2
 db.Cliente.insertOne(
 {
    codigo: 11, nome: 'SR MARCELO', 
     filhos: [
     {nome: 'lu', sexo: 'F'},
     {nome: 'gu', sexo: 'M'},
     {nome: 'ma', sexo: 'F'}
     ]
 }      
)
 
 db.Cliente.find() 
 
 //Atualizando registros: update, updateOne, updateMany
 db.Produto.insertMany(
    [
        {
            codigo: 1,
            nome: 'JARRA',
            preco: 10.00
        },
        {
            codigo: 2,
            nome: 'COLHER',
            preco: 1.99
        },
        {
            codigo: 3,
            nome: 'PANELA',
            preco: 15.00
        }
    ]
)
 db.Produto.find()  
 
 db.Produto.update({codigo: 1}, {$set:{preco: 15.00}});
 
 //atualizar todos registros
 db.Produto.updateMany({ preco: 15.00}, {$set:{preco: 20.00}}); 
 
 //removendo registros
 db.Produto.find();
 
 db.Produto.find({}, {codigo: 1, nome: 1});
 
 db.Produto.find({}, {codigo: 1, nome: 1, _id: 0});
 
 db.Produto.deleteOne({codigo:1});
 
 db.Produto.deleteMany({codigo:{$in:[2,3]}});
 
 //CONSULTAS Base(
 
 //ver o codigo e nome
 db.Cliente.find(
 {}, {codigo: 1, nome: 1}
 )
 
 //nao ver o id criado pelo Mongo 
 db.Cliente.find(
 {}, {codigo: 1, nome: 1, _id:0}
 )
 
//query com condicoes

//select * from Cliente where codigo > 4
db.Cliente.find({ codigo: { $gt: 4}}, {codigo: 1, _id:0}) 

//select * from Cliente where codigo >= 4
db.Cliente.find({ codigo: { $gte: 4}}) 

//select * from Cliente where codigo < 4
db.Cliente.find({ codigo: { $lt: 4}}) 

//select * from Cliente where codigo <= 4
db.Cliente.find({ codigo: { $lte: 4}}) 

//select * from Cliente where codigo between 4 and 5
db.Cliente.find({ codigo: { $gte: 4, $lte: 5}}) 

//select * from Cliente where codigo <> 4
db.Cliente.find({ codigo: { $ne: 4}}) 

//select * from Cliente where codigo = 4
db.Cliente.find({ codigo: { $eq: 4}})

//select * from Cliente where nome like '%Maria%'
db.Cliente.find({nome: /SR/})

//select * from Cliente where nome like 'Maria' ORDERR BY nome 
db.Cliente.find({nome: /SR/}).sort({nome: 1})

//select * from Cliente where nome like 'Maria' ORDERR BY nome limit 10
db.Cliente.find({nome: /SR/}).sort({nome: 2})

//AGREGGATE - substitui o find

db.Venda.insertOne( 
{
    dataVenda: '2020-10-01',
    cliente: {cpf: '111.111.111-11', nome: 'JOSE ARROH DOS SANTOS'},
    produtos: [
        {idProduto: 1, nome: 'MOUSE', quantidade: 2, valorUnitario: 10.50}
    ]
 }
)
 
 db.Venda.find()
 
 db.Venda.insertMany( 
[
 {
    dataVenda: '2020-11-02',
    cliente: {cpf: '222.222.222-22', nome: 'PATERA ARROH DOS SANTOS'},
    produtos: [
        {idProduto: 1, nome: 'MOUSE', quantidade: 2, valorUnitario: 10.50},
         {idProduto: 2, nome: 'TECLADO', quantidade: 2, valorUnitario: 18.50},
          {idProduto: 3, nome: 'MONITOR', quantidade: 2, valorUnitario: 14.50}
    ]
 },
 {
    dataVenda: '2020-11-03',
    cliente: {cpf: '222.222.222-22', nome: 'MICKEY DOS SANTOS'},
    produtos: [
        {idProduto: 1, nome: 'MOUSE', quantidade: 2, valorUnitario: 10.50},
         {idProduto: 2, nome: 'TECLADO', quantidade: 2, valorUnitario: 18.50},
          {idProduto: 3, nome: 'MONITOR', quantidade: 2, valorUnitario: 14.50}
    ]
 }
 ]
)
 
 //SELECT COUNT(*) FROM VENDA WHERE dataVenda BETWEEN X AND Y
 db.Venda.find({dataVenda: {$gte: '2020-10-01', $lte: '2020-12-01'}}).count()
 
 //select count(*) as quantidade, sum(valorTotal) as total from Venda where dataVenda between x and y
 db.Venda.aggregate([
    {
       $match: { dataVenda: {$gte: '2020-10-01', $lte: '2020-12-01'}}}
])

//Aggregate 
db.Venda.aggregate([
    { $match: { dataVenda: {$gte: '2020-10-01', $lte: '2020-12-01'}}}
    , {$group: {
           _id: '', quantidade: { $sum: 1}
       }}
])  
      
//Aggregate  - mostara o total
db.Venda.aggregate([
    { $match: { dataVenda: {$gte: '2020-10-01', $lte: '2020-12-01'}}}
    , {$unwind: '$produtos'} //tira as informações de array e converte linha a linha
    , {$group: {
           _id: '', quantidade: { $sum: 1}, total: {$sum: {$multiply: ['$produtos.quantidade' , '$produtos.valorUnitario']}}
       }}
])   
       
//Aggregate  por cliente
 //groupBy - mostara o total
db.Venda.aggregate([
    { $match: { dataVenda: {$gte: '2020-09-01', $lte: '2020-12-01'}}}
    , {$unwind: '$produtos'} //tira as informações de array e converte linha a linha
    , {$group: {
           _id: '$cliente', quantidade: { $sum: 1}, total: {$sum: {$multiply: ['$produtos.quantidade' , '$produtos.valorUnitario']}}
       }}
]) 
      
db.Venda.insertOne({
      dataVenda: '2020-09-01',
      cliente: {
        cpf: '111.111.111-11',
        nome: 'JOSE D ANZOIS'
       },
       produtos: [ { idProduto: 2, nome: 'TECLADO', quantidade: 10, valor: 70} ]    
   })


//Aggregate  - agregando pelo cpf
db.Venda.aggregate([
    { $match: { dataVenda: {$gte: '2020-09-01', $lte: '2020-12-01'}}}
    , {$unwind: '$produtos'} //tira as informações de array e converte linha a linha
    , {$group: {
           _id: '$cliente.cpf', quantidade: { $sum: 1}, total: {$sum: {$multiply: ['$produtos.quantidade' , '$produtos.valorUnitario']}}
       }}
])
       
db.Venda.aggregate([
    { $match: { dataVenda: {$gte: '2020-09-01', $lte: '2020-12-01'}}}
    , {$unwind: '$produtos'} //tira as informações de array e converte linha a linha
    , {$group: {
           _id: {cpf:'$cliente.cpf'}, quantidade: { $sum: 1}, total: {$sum: {$multiply: ['$produtos.quantidade' , '$produtos.valorUnitario']}}
       }}
])

//Aggregate - projecao
db.Venda.aggregate([
    { $match: { dataVenda: {$gte: '2020-09-01', $lte: '2020-12-01'}}}
    , {$unwind: '$produtos'} //tira as informações de array e converte linha a linha
    , {$group: {
           _id: '$cliente.cpf', quantidade: { $sum: 1}, total: {$sum: {$multiply: ['$produtos.quantidade' , '$produtos.valorUnitario']}}
       }},
       { $project: {cpf: '$_id', quantidade: '$quantidade', total: '$total', _id: 0} }
])
       
//Atualizando valor da venda com aggregate e update
db.Venda.aggregate([
    { $match: { dataVenda: {$gte: '2020-01-01', $lte: '2020-12-01'}}}
    , {$unwind: '$produtos'} //tira as informações de array e converte linha a linha
    , {$group: {
           _id: '$_id', total: { $sum: {$multiply: ['$produtos.quantidade' , '$produtos.valorUnitario']}} }}
]).forEach(function (x) {
    db.Venda.update({_id: x._id}, {$set: {valorTotal: x.total}}}
    })
    
// Identificando qual valor é maior e menor que 500 com If
db.Venda.aggregate([
    { $match: { dataVenda: {$gte: '2020-01-01', $lte: '2020-12-01'}}}
    , {$unwind: '$produtos'} //tira as informações de array e converte linha a linha
    , {$group: {_id: '$_id', total: { $sum: {$multiply: ['$produtos.quantidade' , '$produtos.valorUnitario']}} }}
    , {
         $project: {
             total: '$total',
             acima500: { $cond: { if: {$gte: ['$total', 500]}, then: 'ACIMA DE 500', else: 'ABAIXO DE 500'}}
         }
      }
]);
      
 // distinct
 db.Venda.distinct( 'produtos')
      
 db.Venda.distinct( 'produtos.nome')
      
 db.Venda.aggregate([ 
      {$unwind: '$produtos'},
      { $group: { _id: '', produtos: { $addToSet: '$produtos.nome'}}}
 ])
  
 db.Venda.aggregate( [
   { $unwind: '$produtos' },
   {$group: { _id: '', produtos: { $push: '$produtos.nome' } }  }
])

//MAX E MIN -> select max(dataVenda), min(dataVenda) from Venda
db.Venda.aggregate( 
    [ 
        { $group: { _id: '', dataMax: { $max: '$dataVenda' }, dataMin: { $min: '$dataVenda'} } }
    ]
)
        
db.Venda.find().sort({dataVenda: 1})

//CONCAT E SUBSTRING
db.Venda.aggregate( 
    [
        {$project: { cpf: '$cliente.cpf', nome: '$cliente.nome', dataVenda: '$dataVenda', concatenado: { $concat: [ '$cliente.cpf', '$cliente.nome']}}}
    ]
)
        
db.Venda.aggregate( 
    [
        {$project: { cpf: '$cliente.cpf', nome: '$cliente.nome', dataVenda: '$dataVenda', concatenado: { $concat: [ '$cliente.cpf', '$cliente.nome']},
        substring: {$substr: [ '$cliente.nome', 9,6]}
        }}
    ]
)

//Agrupando por mes e ano
db.Venda.aggregate([ 
    { $match: {dataVenda: {$gte: '2020-01-01', $lte: '2021-10-01'}} }
    , { $unwind: '$produtos' }
    , { $project: { dataMes: { $substr: ['$dataVenda', 0,7]}, nomeProduto: '$produtos.nome', valor: {$multiply: ['$produtos.valorUnitario', '$produtos.quantidade']}}}
    , { $group: { _id: '$nomeProduto',
                  'SETEMBRO': { $sum: {$cond: { if: { $eq: ['$dataMes', '2020-09']},then: '$valor', else: 0}}}
                , 'OUTUBRO': {$sum: {$cond: { if: {$eq: ['$dataMes', '2020-10']}, then: '$valor', else: 0}}} 
                , 'NOVEMBRO': {$sum: {$cond: { if: {$eq: ['$dataMes', '2020-11']}, then: '$valor', else: 0}}}                 
        }}
   , {$project: {PRODUTO: '$_id', SETEMBRO: '$SETEMBRO', OUTUBRO: '$OUTUBRO', NOVEMBRO: '$NOVEMBRO', _id: 0}}
])