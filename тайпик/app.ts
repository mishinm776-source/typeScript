class Book {
  private static nextId = 1;

  public id: number;
  public title: string;
  public author: string;
  public createdAt: Date;

  constructor(title: string, author: string) {
    this.id = Book.nextId++;
    this.title = title;
    this.author = author;
    this.createdAt = new Date();
  }

  getInfo(): string {
    return `#${this.id} | ${this.title} — ${this.author}`;
  }
}

class BookStore {
  private books: Book[] = [];

  addBook(book: Book): boolean {
    if (this.exists(book.title, book.author)) {
      return false;
    }
    this.books.push(book);
    return true;
  }

  getAll(): Book[] {
    return this.books;
  }

  getCount(): number {
    return this.books.length;
  }

  exists(title: string, author: string): boolean {
    return this.books.some(
      b =>
        b.title.toLowerCase() === title.toLowerCase() &&
        b.author.toLowerCase() === author.toLowerCase()
    );
  }
}

class App {
  private titleInput: HTMLInputElement;
  private authorInput: HTMLInputElement;
  private addBtn: HTMLButtonElement;
  private list: HTMLElement;
  private count: HTMLElement;
  private error: HTMLElement;

  private store: BookStore;

  constructor() {
    this.titleInput = document.getElementById("titleInput") as HTMLInputElement;
    this.authorInput = document.getElementById("authorInput") as HTMLInputElement;
    this.addBtn = document.getElementById("addBtn") as HTMLButtonElement;
    this.list = document.getElementById("list")!;
    this.count = document.getElementById("count")!;
    this.error = document.getElementById("error")!;

    this.store = new BookStore();

    this.addBtn.addEventListener("click", () => this.handleAdd());
  }

  private normalize(str: string): string {
    return str.trim().replace(/\s+/g, " ");
  }

  private showError(message: string) {
    this.error.textContent = message;
  }

  private clearError() {
    this.error.textContent = "";
  }

  private clearInputs() {
    this.titleInput.value = "";
    this.authorInput.value = "";
  }

  private render() {
    this.list.innerHTML = "";

    this.store.getAll().forEach(book => {
      const div = document.createElement("div");
      div.className = "card";
      div.textContent = book.getInfo();
      this.list.appendChild(div);
    });

    this.count.textContent = this.store.getCount().toString();
  }

  private handleAdd() {
    this.clearError();

    let title = this.normalize(this.titleInput.value);
    let author = this.normalize(this.authorInput.value);

    if (!title || !author) {
      this.showError("Поля не должны быть пустыми");
      return;
    }

    const book = new Book(title, author);

    if (!this.store.addBook(book)) {
      this.showError("Такая книга уже есть в списке");
      return;
    }

    this.clearInputs();
    this.render();
  }
}

new App();