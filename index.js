const express = require('express');
const index = express ();
index.use(express.json());
const port = process.env.PORT || 3000;


let books = [];

index.get("/whoami", (req, res) => {
    res.send({"studentNumber":"2677730"});
});

index.get("/books", (req, res) => {
    res.send(books);
});

index.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
  
    const book = books.find(book => book.id == bookId);
  
    if (!book) {
      return res.status(404).json({ message: "Not found" });
    }
  
    res.json(book);
  });
index.post("/books", (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).json({ message: 'Book added'});
    //add error handling
});

index.post("/books/:id/details", (req, res) => {
  const bookId = req.params.id;
  const updateKey = Object.keys(req.body)[0];
  const updateValue = req.body[updateKey];
  if (!books[bookId].details.hasOwnProperty(updateKey)) {
    books[bookId].details.updateKey = updateValue;
    res.json({ message: "Detail added successfully"});
  }
  else{
    res.json({ message: "Detail already exists"});
  }
});

index.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const updateKey = Object.keys(req.body)[0];
  const updateValue = req.body[updateKey];

  const bookIndex = books.findIndex(book => book.id == bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book Not found" });
  }
  books[bookIndex][updateKey] = updateValue;
  res.json({ message: "Book updated successfully"});
});

index.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const originalLength = books.length;
    books = books.filter(book => book.id !== id);

    if (books.length === originalLength) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Book deleted successfully" });
});

index.delete("/books/:id/details/:detailID", (req, res) => {
  const bookId = req.params.id;
  const detailID = req.params.detailID;

  const bookIndex = books.findIndex(book => book.id == bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  let theBook = books[bookIndex];
  const detailIndex = theBook.details.findIndex(detail => detail.id == detailID);
  
  if (detailIndex === -1) {
    return res.status(404).json({ message: "Detail not found" });
  }

  theBook.details.splice(detailIndex, 1);

  res.json({ message: "Detail deleted successfully" });
});


index.listen(port, () => {
    console.log("Server Listening on PORT:", port);
  });