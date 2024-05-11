const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// make dir if it isn't exist
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// make file if it isn't exist
const contactsFile = "./data/contacts.json";
if (!fs.existsSync(contactsFile)) {
  fs.writeFileSync(contactsFile, "[]", "utf-8");
}

// load contacts
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = {
    nama,
    email,
    noHP,
  };

  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find(contact => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Nama sudah terdaftar, coba nama lain!")
    );
    return false;
  }

  // cek validasi
  if (email) {
    if (!validator.isEmail(email)) {
      console.error(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  // cek nomor

  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.error(chalk.red.inverse.bold("Nomor tidak valid!"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold("Terimakasih sudah memasukan data!"));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.blueBright.inverse.bold("Daftar Kontak :"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = nama => {
  const contacts = loadContact();
  const contact = contacts.find(
    contact => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!!!!`));
    return false;
  }
  console.log(contact.nama);
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = nama => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    contact => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!!!!`));
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold("Kontak sudah dihapus!"));
};

module.exports = {simpanContact, listContact, detailContact, deleteContact};
