export class ClientVariables {
  public DeleteTemplate = `<div class="container custom-container">
                      <div class="col-md-12">
                          <h2 class="mb-3 text-center">Delete Client ?</h2>
                      </div>
                    </div>`;
  public AddTemplate = `<div class="form-group">
                  <label for="firstNameAdd">FirstName</label>
                  <input pattern="[A-Za-z]*" type="text" [(ngModel)]="clientAdd.firstName"
                         class="form-control"
                         id="firstNameAdd"
                         name="firstNameAdd"
                         placeholder="Enter your firstName"
                         required #firstNameAdd="ngModel">
                  <div [hidden]="!firstNameAdd.pristine" class="alert alert-danger">firstName is required</div>
                </div>
                <div class="form-group">
                  <label for="lastNameAdd">LastName</label>
                  <input pattern="[A-Za-z]*" type="text" [(ngModel)]="clientAdd.lastName"
                         class="form-control"
                         id="lastNameAdd"
                         name="lastNameAdd"
                         placeholder="Enter your lastName"
                         required #lastNameAdd="ngModel">
                  <div [hidden]="!lastNameAdd.pristine" class="alert alert-danger">lastName is required</div>
                </div>
                <div class="form-group">
                  <label for="cinAdd">Cin</label>
                  <input pattern="[A-Z][0-9]{6}[A-Z]" type="text" [(ngModel)]="clientAdd.cin"
                         class="form-control"
                         id="cinAdd"
                         name="cinAdd"
                         placeholder="Enter your cin"
                         required #cinAdd="ngModel">
                  <div [hidden]="!cinAdd.pristine" class="alert alert-danger">CIN is required</div>
                </div>
                <div class="form-group">
                  <label for="emailAdd">Email</label>
                  <input pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$" type="email" [(ngModel)]="clientAdd.mail"
                         class="form-control"
                         id="emailAdd"
                         name="emailAdd"
                         placeholder="Enter your email address"
                         required #emailAdd="ngModel">
                  <img [src]="imgURL" height="200" *ngIf="imgURL">
                  <div [hidden]="!emailAdd.pristine" class="alert alert-danger">Email is required</div>
                </div>
                <div class="form-group">
                  <label for="imageAdd">Image</label>
                  <input type="file" [(ngModel)]="clientAdd.imageSrc"
                         class="form-control"
                         id="imageAdd"
                         name="imageAdd"
                         placeholder="Choose your imageAdd "
                         required #imageAdd="ngModel"
                         accept="image/*"
                         (change)="onFileChanged($event)">
                  <div [hidden]="!imageAdd.pristine" class="alert alert-danger">Image is required</div>
                </div>`;
  constructor() {}
}
