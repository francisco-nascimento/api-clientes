const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.listen('3000', function(){
   console.log('Server started on port 3000');
});
app.get('/',(req, res) => {
   res.send('Página inicial');
});

app.get('/clientes', (req, res)=>{
    db.query('SELECT * from Cliente', function (error, results) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(results);
        }
    });
 });
 
 app.get('/cliente/:id', (req, res)=>{
    db.query('SELECT * from Cliente where id = ?', req.params.id,  
     function (error, results) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(results);
        }
    });
 });

 app.delete('/cliente/:id', function (req, res){
    db.query('DELETE from Cliente where id = ?', req.params.id,  
     function (error, results) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json({mensagem: 'Cliente removido com sucesso!'});
        }
    });
 });

 app.post('/cliente', function (req, res){
    console.log(req.body);
    let cliente = req.body;
    db.query('INSERT INTO Cliente SET ?', cliente,  
    function (error, results) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json({mensagem: 'Cliente inserido com sucesso!'});
        }
    });
 });
 
 app.put('/cliente/:id', function(req, res){
    let dados = [req.body, req.params.id];
    db.query('UPDATE Cliente SET ? where id = ?', dados,  
     function (error, results) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json({mensagem: 'Cliente atualizado com sucesso!'});
        }
    });
 });

  