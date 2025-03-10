import express from "express";
import "dotenv/config";

//1.Creating a App First
const app = express();

//2. Initialing the port
const port = process.env.PORT || 3000;

//3. This is Middleware we can say this it accepts the Json only.
app.use(express.json());

//This is Array to store the data.
let teaData = [];
//This is For Index
let nextId = 1;

//Post Req at /teas which takes two para req -> that we accept and the res -> that we after that
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// :id means we want the id from the user.
// takes and with the help of find we search in the teaData.

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not Found....");
  } else {
    res.status(200).send(tea);
  }
});

// this is for update the tea with the given id.
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not Found....");
  }
  const { name, price } = req.body;

  tea.name = name;
  tea.price = price;
  res.send(200).send(tea);
});

//Which tea you want to delete.
//This uses the findIndex method to find the index of given tea.
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Tea Not Found...");
  }

  //Delete the given index
  teaData.splice(index, 1);
  res.status(200).send(`Deleted Successfully`);
});

// app.get('/', (req, res) => {
//     res.send("Hello from Goutam")
// })

//4. At which PORT the app is listen. it takes port number and the Callback
app.listen(port, () => {
  console.log(`server is started at port : ${port}...`);
});
