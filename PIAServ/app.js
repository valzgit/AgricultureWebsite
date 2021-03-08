const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cors = require("cors");
var nodemailer = require('nodemailer');
const app = express();


app.use(bodyparser.json());

app.use(cors());

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'examplemail@mail.com',
        pass: '**********'
    }
    /*,tls: {
        rejectUnauthorized: false
    }*/
});
var mailOptions = {
    from: 'examplemail@mail.com',
    to: 'examplemail2@mail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YourDataBasePassword",
    database: "users",


});

app.post("/get", (req, res) => {
    let query = db.query("SELECT * FROM users WHERE username=? AND password=?", [req.body.username, req.body.password], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
});

app.post("/insertpoljoprivrednik", (req, res) => {
 
    let query = db.query("INSERT INTO users(username,password,type,accepted) VALUES(?,?,?,'n');",
        [req.body.username, req.body.password1, 'k'], (err, results) => {
            if (err) throw err;
        });
    let query2 =
        db.query("INSERT INTO polj VALUES((SELECT MAX(id) from users),?,?,?,?,?,?);",
            [req.body.Ime, req.body.Prezime, JSON.stringify(req.body.Datum), req.body.Mesto, req.body.Telefon, req.body.email], (err, results) => {
                if (err) throw err;
                res.send(results); console.log(results);
            });
});
app.post("/insertpreduzece", (req, res) => {
  
    let query = db.query("INSERT INTO users(username,password,type,accepted) VALUES(?,?,?,'n');",
        [req.body.username, req.body.password1, 'p'], (err, results) => {
            if (err) throw err;
        });
    let query2 =
        db.query("INSERT INTO pred VALUES((SELECT MAX(id) from users),?,?,?,?);",
            [req.body.Punoime, JSON.stringify(req.body.Datum), req.body.Mesto, req.body.email], (err, results) => {
                if (err) throw err;
                console.log(results);
                let query4 = db.query("INSERT INTO kuriri(idpreduzeca) VALUES ((SELECT MAX(id) FROM users)),((SELECT MAX(id) FROM users)),((SELECT MAX(id) FROM users)),((SELECT MAX(id) FROM users)),((SELECT MAX(id) FROM users))",
                    (err, results) => {
                        if (err) throw err;
                        console.log(results);
                        res.send(results);
                    })
            });
});
app.post("/get/sifra", (req, res) => {
    let query = db.query("SELECT password FROM users WHERE password=? AND username=?", [req.body.p, req.body.u], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
})
app.post("/get/rasadnikdohvati/opet", (req, res) => {
    let query = db.query("SELECT id,idv,naziv,mesto,temp,voda,slobodno,zauzeto,duz,sir FROM rasadnici WHERE idv=(SELECT id FROM users WHERE username=?)", [req.body.ime], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
})
app.get("/get/dohvatiPolj/dodatno/r/:id", (req, res) => {
    let query = db.query("SELECT * FROM polj WHERE id=?", [req.params.id], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
})
app.get("/get/dohvatiPred/dodatno/r/:id", (req, res) => {
    let query = db.query("SELECT * FROM pred WHERE idp=?", [req.params.id], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
})
app.post("/insertazurirajPolj", (req, res) => {
    let query = db.query("UPDATE polj SET Ime=?,Prezime=?,Datum=?,Mesto=?,Telefon=?,email=? WHERE id=?",
        [req.body.Ime, req.body.Prezime, req.body.Datum, req.body.Mesto, req.body.Telefon, req.body.email, req.body.id], (err, results) => {
            if (err) throw err;
            res.send(results); console.log(results);
        });
})
app.post("/ins", (req, res) => {
    let query = db.query("UPDATE pred SET ime=?,datum=?,mesto=?,email=? WHERE idp=? ",
        [req.body.ime, req.body.datum, req.body.mesto, req.body.email, req.body.idp], (err, results) => {
            if (err) throw err;
            res.send(results);
            console.log(results);
        });
})
app.post("/insert/sifra", (req, res) => {
    let query = db.query("UPDATE users SET password=? WHERE username=? ", [req.body.p, req.body.u], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
})
app.get("/dodajrasadnik/:u/:n/:m/:broj/:duz/:sir", (req, res) => {
    let pom = "INSERT INTO sadnice(idr) VALUES";
    let query = db.query("INSERT INTO rasadnici(idv,naziv,mesto,povrsina,temp,voda,slobodno,zauzeto,duz,sir) VALUES((SELECT id FROM users WHERE username=?),?,?,?,18,200,?,0,?,?) ",
        [req.params.u, req.params.n, req.params.m, req.params.broj, req.params.broj, req.params.duz, req.params.sir], (err, results) => {
            if (err) throw err;

        });
    for (let i = 0; i < req.params.broj - 1; i++) {
        pom = pom + "((SELECT MAX(id) from rasadnici)),";
    }
    pom += "((SELECT MAX(id) from rasadnici))";
    let query2 = db.query(pom, (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
})
app.get("/get/admin", (req, res) => {
    let query = db.query("SELECT * FROM users WHERE accepted='n'", (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
});
app.get("/get/admin2", (req, res) => {
    let query = db.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
});
app.post("/getusername", (req, res) => {
    let query = db.query("SELECT * FROM users WHERE username=?", [req.body.u], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
});
app.get("/get/sadnica/dohvati/:id", (req, res) => {
    let query = db.query("SELECT * FROM sadnice WHERE idr=?", [req.params.id], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
});
app.get("/delete/user/:u", (req, res) => {
    let query = db.query("DELETE FROM users WHERE username=?", [req.params.u], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})

app.post("/insertprihvacen", (req, res) => {
    let query = db.query("UPDATE users SET accepted='y' WHERE username=? AND password=? AND type=?", [req.body.u, req.body.s, req.body.t], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
});

app.post("/insertobrisan", (req, res) => {
    let query = db.query("DELETE FROM users WHERE username=? AND password=? AND tip=?;", [req.body.u, req.body.s, req.body.t], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    });
});
app.get("/dodajvodu/:s", (req, res) => {
    let query = db.query("UPDATE rasadnici SET voda=voda+1 WHERE id=?", [req.params.s], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})
app.get("/smanjivodu/:s", (req, res) => {
    let query = db.query("UPDATE rasadnici SET voda=voda-1 WHERE id=?", [req.params.s], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})
app.get("/dodajtemp/:s", (req, res) => {
    let query = db.query("UPDATE rasadnici SET temp=temp+1 WHERE id=?", [req.params.s], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})
app.get("/smanjitemp/:s", (req, res) => {
    let query = db.query("UPDATE rasadnici SET temp=temp-1 WHERE id=?", [req.params.s], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})
app.get("/dohvatimagacin/:s", (req, res) => {
    let query = db.query("SELECT proizvodi.*,pred.ime FROM proizvodi,pred WHERE proizvodi.idrasadnika=? AND proizvodi.proizvodjac=pred.idp", [req.params.s], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})
app.get("/dohvatimagacinnaziv/:s", (req, res) => {
    let query = db.query("SELECT DISTINCT(naziv) FROM proizvodi WHERE proizvodi.idrasadnika=?", [req.params.s], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})

app.get("/dohvatimagacinproizvodjac/:s", (req, res) => {
    let query = db.query("SELECT DISTINCT(pred.ime) FROM proizvodi,pred WHERE proizvodi.idrasadnika=? AND proizvodi.proizvodjac=pred.idp", [req.params.s], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})
app.get("/dohvatishop/:s", (req, res) => {
    let query = db.query("SELECT proizvodi.*,pred.ime FROM proizvodi,pred WHERE proizvodi.proizvodjac=proizvodi.idvlasnika AND proizvodi.proizvodjac=pred.idp", (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})
app.get("/dohvatishopnaziv/:s", (req, res) => {
    let query = db.query("SELECT DISTINCT(naziv) FROM proizvodi WHERE proizvodi.proizvodjac=proizvodi.idvlasnika", (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})

app.get("/dohvatishopproizvodjac/:s", (req, res) => {
    let query = db.query("SELECT DISTINCT(pred.ime) FROM proizvodi,pred WHERE proizvodi.proizvodjac=proizvodi.idvlasnika AND proizvodi.proizvodjac=pred.idp", (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})

app.get("/zasadiseme/:s/:r/:p", (req, res) => {
  /*   let query = db.query("UPDATE sadnice SET zasadjen=(SELECT idproizvodi FROM proizvodi WHERE naziv=(SELECT naziv FROM proizvodi WHERE idproizvodi=?) AND idvlasnika=proizvodjac),proizvod=(SELECT naziv FROM proizvodi WHERE idproizvodi=?),proizvodjac=(SELECT ime FROM pred WHERE idp=(SELECT proizvodjac FROM proizvodi WHERE idproizvodi=?)),izvadi=600 WHERE id=?", [req.params.p, req.params.p, req.params.p, req.params.s], (err, results) => {
        if (err) throw err;
        console.log(results);
    }) */
    console.log("USAO");
    let query = db.query("UPDATE sadnice SET zasadjen=?,proizvod=(SELECT naziv FROM proizvodi WHERE idproizvodi=?),proizvodjac=(SELECT ime FROM pred WHERE idp=(SELECT proizvodjac FROM proizvodi WHERE idproizvodi=?)),izvadi=24*60*(SELECT dani FROM proizvodi WHERE idproizvodi=?),trajanje=24*60*(SELECT dani FROM proizvodi WHERE idproizvodi=?) WHERE id=?", [req.params.p, req.params.p, req.params.p,req.params.p,req.params.p, req.params.s], (err, results) => {
        if (err) throw err;
        console.log(results);
    })
    let query2 = db.query("UPDATE rasadnici SET slobodno=slobodno-1,zauzeto=zauzeto+1 WHERE id=? ", [req.params.r], (err, results) => {
        if (err) throw err;
        console.log(results);
    })
    let query3 = db.query("UPDATE proizvodi SET kol=kol-1 WHERE idproizvodi=?", [req.params.p], (err, results) => {
        if (err) throw err;
        console.log(results);
    })
    let query4 = db.query("DELETE FROM proizvodi WHERE kol=0 AND idproizvodi=?", [req.params.p], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})
app.get("/izvadi/:s", (req, res) => {
    let query = db.query("UPDATE rasadnici SET slobodno=slobodno+1,zauzeto=zauzeto-1 WHERE id=(SELECT idr FROM sadnice WHERE id=?)", [req.params.s], (err, results) => {
        if (err) throw err;
        console.log(results);
    })
    let query2 = db.query("UPDATE sadnice SET proizvod='Pending',zasadjen=NULL,proizvodjac=NULL,izvadi=1440 WHERE id=?", [req.params.s], (err, results) => {
        if (err) throw err;
        res.send(results); console.log(results);
    })
})
app.post("/uzmidozvole", (req, res) => {
    let query = db.query("SELECT * FROM dozvole WHERE idproiz=? AND iduser=(SELECT id FROM users WHERE username=?) LIMIT 1", [req.body.idproizvodi, req.body.username], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})
app.post("/comment", (req, res) => {
    let query = db.query("INSERT INTO komentari(iduse,idpro,komentar,ocena) VALUES((SELECT id FROM users WHERE username=?),?,?,?)",
        [req.body.username, req.body.idpro, req.body.c, req.body.o], (err, results) => {
            if (err) throw err;
            console.log(results);
            let query = db.query("UPDATE proizvodi SET brojocena=brojocena+1,ocena=(SELECT AVG(ocena) FROM komentari WHERE idpro=?) WHERE idproizvodi=?",
                [req.body.idpro, req.body.idpro], (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    let query = db.query("UPDATE dozvole SET komentarisao=1 WHERE iduser=(SELECT id FROM users WHERE username=?) AND idproiz=?", [req.body.username, req.body.idpro], (err, results) => {
                        if (err) throw err;
                        console.log(results);
                        res.send(results);
                    })
                })
        })
})
app.get("/iskoristiproizvod/:s/:r/:p", (req, res) => {
    let query = db.query("UPDATE sadnice SET izvadi=izvadi-24*60*(SELECT dani FROM proizvodi WHERE idproizvodi=?) WHERE id=?", [req.params.p, req.params.s], (err, results) => {
        if (err) throw err;
        console.log(results);
        let query2 = db.query("UPDATE sadnice SET izvadi=0 WHERE izvadi<=0 AND id=?", [req.params.s], (err, results) => {
            if (err) throw err;
            console.log(results);
        })
    })
   
    let query3 = db.query("UPDATE proizvodi SET kol=kol-1 WHERE idproizvodi=?", [req.params.p], (err, results) => {
        if (err) throw err;
        console.log(results);
        let query4 = db.query("DELETE FROM proizvodi WHERE kol=0 AND idproizvodi=?", [req.params.p], (err, results) => {
            if (err) throw err;
            res.send(results); console.log(results);
        })
    })
  
})
//ovaj zahtev bi morao da bude post ukoliko je naziv korisnika proizvoda ili preduzeca sa specijalnim znacima
app.get("/naruci/:idp/:idv/:naziv/:kol/:proiz/:vrsta/:idr/:dani/:ocena", (req, res) => {
    let query = db.query("UPDATE proizvodi SET kol=kol-? WHERE idproizvodi=?", [req.params.kol, req.params.idp], (err, results) => {
        if (err) throw err;
        console.log(results);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;
        let query2 = db.query("INSERT INTO proizvodi(idvlasnika,naziv,kol,proizvodjac,vrsta,idrasadnika,dani,brojocena,ocena,datum) VALUES(?,?,?,?,?,?,?,?,?,?)",
            [req.params.idv, req.params.naziv, req.params.kol, req.params.proiz, req.params.vrsta, req.params.idr, req.params.dani, -1, req.params.ocena, today], (err, results) => {
                if (err) throw err;
                console.log(results);
                res.send(results);
            })
    })

})
app.get("/oznacidatum/:idproiz", (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    let query3 = db.query("INSERT INTO datumi(idproizv,datum) VALUES(?,?)",
        [req.params.idproiz, today], (err, results) => {
            if (err) throw err;
            res.send(results); console.log(results);
        })
})
app.get("/ponisti/:ocena", (req, res) => {
    let query1 = db.query("SELECT * FROM proizvodi WHERE ocena=?", [req.params.ocena], (err, results) => {
        if (err) throw err;
        console.log(results);
        results.forEach(e => {
            let query = db.query("UPDATE proizvodi SET kol=kol+? WHERE idvlasnika=proizvodjac AND naziv=?", [e.kol, e.naziv], (err, results) => {
                if (err) throw err;
                console.log(results);
            })
        })
        let query4 = db.query("DELETE FROM proizvodi WHERE ocena=?", [req.params.ocena], (err, results) => {
            if (err) throw err;
            res.send(results); console.log(results);
        })

    })
})
app.get("/generator", (req, res) => {
    let x = null;
    let query = db.query("SELECT MAX(id) AS 'id' from generator", (err, results) => {
        if (err) throw err;
        x = results;
        console.log(results);

        let query2 = db.query("INSERT INTO generator(broj) VALUES(0)", (err, results2) => {
            if (err) throw err;
            console.log(results2);
        })
        res.send(x);

    })
})
app.get("/uzmikomentare/:idproizvodi", (req, res) => {
    let query = db.query("SELECT komentari.*,users.username AS 'user' FROM komentari,users WHERE komentari.idpro=? AND komentari.iduse=users.id", [req.params.idproizvodi], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})
app.post("/proizvodeuzmi", (req, res) => {
    let query = db.query("SELECT * FROM proizvodi WHERE idvlasnika=(SELECT id FROM users WHERE username=?)", [req.body.i], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})
app.get("/povuciproizvod/:i", (req, res) => {
    let query2=db.query("SELECT naziv,proizvodjac FROM proizvodi WHERE idproizvodi=? LIMIT 1",[req.params.i],(err,results)=>{
        if (err) throw err;
        console.log(results);
        results.forEach(element => {
            let query = db.query("DELETE FROM proizvodi WHERE idproizvodi=? OR (naziv=? AND proizvodjac=? AND brojocena=-1)", [req.params.i,element.naziv,element.proizvodjac], (err, results) => {
                if (err) throw err;
                console.log(results);
                res.send(results);
            })
        });
      
    })
})
app.post("/dodajproizvod", (req, res) => {
    let query = db.query("INSERT INTO proizvodi(idvlasnika,proizvodjac,naziv,vrsta,cena,kol,dani,brojocena) VALUES((SELECT id FROM users WHERE username=?),(SELECT id FROM users WHERE username=?),?,?,?,?,?,0)",
        [req.body.u, req.body.u, req.body.n, req.body.v, req.body.c, req.body.k, req.body.d], (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
        })
})
app.post("/proveridalvecima", (req, res) => {
    let query = db.query("SELECT naziv FROM proizvodi WHERE naziv=? AND proizvodjac=(SELECT id FROM users WHERE username=?)",
        [req.body.n,req.body.u], (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
        })
})
app.post("/dohvatinarudzbine", (req, res) => {
    let query = db.query("SELECT * FROM proizvodi WHERE proizvodjac=(SELECT id FROM users WHERE username=?) AND brojocena=-1", [req.body.i], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})
app.post("/dohvatikurire", (req, res) => {
    let query = db.query("SELECT * FROM kuriri WHERE idpreduzeca=(SELECT id FROM users WHERE username=?) AND status='spreman'", [req.body.i], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})
app.get("/posaljikurira/:id/:vreme/:por", (req, res) => {
    let query = db.query("UPDATE kuriri SET k=?,duplikat=?,status='ide',por=? WHERE id=?", [req.params.vreme, req.params.vreme, req.params.por, req.params.id], (err, results) => {
        if (err) throw err;
        console.log(results);
    })
    let query2 = db.query("UPDATE proizvodi SET brojocena=-2 WHERE ocena=?", [req.params.por], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})
app.post("/dohvatilokacije", (req, res) => {
    let query = db.query("SELECT mesto FROM pred WHERE idp=(SELECT id FROM users WHERE username=?) UNION (SELECT mesto FROM rasadnici WHERE id=(SELECT idrasadnika FROM proizvodi WHERE ocena=? LIMIT 1))",
        [req.body.naziv, req.body.id], (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
        })
})
app.get("/nacekanju/:id", (req, res) => {
    let query = db.query("UPDATE proizvodi SET cena=-1 WHERE idproizvodi=?", [req.params.id], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})
app.post("/datumi", (req, res) => {
    let query = db.query("SELECT idproizv,datum,COUNT(*) as broj FROM datumi WHERE idproizv=(SELECT id FROM users WHERE username=?) GROUP BY datum", [req.body.i], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})
app.get("/posaljimejl/:id", (req, res) => {
    let query3 = db.query("SELECT * FROM rasadnici WHERE id=?",[req.params.id], (err, results) => {
        if (err) throw err;
        results.forEach(element => {
            if (element.temp < 12 || element.voda < 75) {
                let query4 = db.query("SELECT * FROM polj WHERE id=?", [element.idv], (err, results) => {
                    if (err) throw err;
                    results.forEach(element2 => {
                        var mailOptions2 = {
                            from: 'examplemail@mail.com',
                            to: element2.email,
                            subject: 'Low on resources!',
                            text: 'Your farm is in danger, check it to fix all the problems...'
                        };
                        transporter.sendMail(mailOptions2, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    });
                    console.log("POSLAO MEJL");
                    res.send(results);
                });
            }
        });
    });
})
function funkcija() {
    let query = db.query("UPDATE rasadnici SET temp=temp-0.5", (err, results) => {
        if (err) throw err;
    });
    let query2 = db.query("UPDATE rasadnici SET voda=voda-1", (err, results) => {
        if (err) throw err;
    });
    let query3 = db.query("SELECT * FROM rasadnici", (err, results) => {
        if (err) throw err;
        results.forEach(element => {
            if (element.temp < 12 || element.voda < 75) {
                let query4 = db.query("SELECT * FROM polj WHERE id=?", [element.idv], (err, results) => {
                    if (err) throw err;
                    results.forEach(element2 => {
                        var mailOptions2 = {
                            from: 'examplemail@mail.com',
                            to: element2.email,
                            subject: 'Low on resources!',
                            text: 'Your farm is in danger, check it to fix all the problems...'
                        };
                        transporter.sendMail(mailOptions2, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    });

                });
            }
        });
    });
}
function funkcija2() {
    let query = db.query("UPDATE sadnice SET izvadi=izvadi-1 WHERE izvadi IS NOT NULL AND izvadi>0", (err, results) => {
        if (err) throw err;
        let query2 = db.query("UPDATE sadnice SET proizvod='Prazan',izvadi=NULL WHERE izvadi<=0 AND proizvod='Pending'", (err, results) => {
            if (err) throw err;
        });
    });
  
}
function funkcija3() {
    let query = db.query("UPDATE kuriri SET k=k-1 WHERE status='ide' OR status='vraca'", (err, results) => {
        if (err) throw err;
    });
    let query2 = db.query("SELECT * FROM kuriri WHERE status='ide' AND k<=0", (err, results) => {
        if (err) throw err;
        results.forEach(element => {
            let query3 = db.query("UPDATE proizvodi SET brojocena=0 WHERE ocena=?", [element.por], (err, results) => {
                if (err) throw err;
            });
            let query6 = db.query("SELECT * FROM proizvodi WHERE ocena=?", [element.por], (err, res) => {
                if (err) throw err;
                res.forEach(el => {
                    let query7 = db.query("INSERT INTO dozvole(iduser,idproiz) VALUES((SELECT idvlasnika FROM proizvodi WHERE ocena=? LIMIT 1),(SELECT MIN(idproizvodi) FROM proizvodi WHERE naziv=? AND proizvodjac=?))",
                        [element.por, el.naziv, el.proizvodjac], (err, results) => {
                            if (err) throw err;
                        });
                });
            });
        });
        let query4 = db.query("UPDATE kuriri SET status='vraca',k=duplikat,duplikat=0 WHERE status='ide' AND k<=0", (err, results) => {
            if (err) throw err;
        });
        let query5 = db.query("UPDATE kuriri SET status='spreman',k=0,por=0 WHERE status='vraca' AND k<=0", (err, results) => {
            if (err) throw err;
        });
    })
}
setInterval(() => funkcija(), 3600000);//3600000
setInterval(() => funkcija2(), 60000);//60000
setInterval(() => funkcija3(), 60000);//60000
db.connect((err) => {
    if (err) throw err;
    console.log("MySQL is connected");
})


