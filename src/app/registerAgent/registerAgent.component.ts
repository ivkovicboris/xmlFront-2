import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/DataService';
import { Router } from '@angular/router';
import { MustMatch } from '../must-match.validator';
import { RegisterUser } from '../shared/RegisterUser';
import { Mail } from '../shared/Mail';


@Component({
    selector: 'registerAgent-component',
    templateUrl: 'registerAgent.component.html',
    styleUrls: ['registerAgent.component.css']
})
export class RegisterAgentComponent implements OnInit{
    registerForm: FormGroup;
    public error:boolean = true;
    public submitted = false;
    result: any;
    public mail:any;
    receivers: string[];
 
    constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}
    
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, 
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[!@#$%^&*(),.?":<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
                ]
           ],
            confirmPassword: ['', Validators.required],
            pib: ['',Validators.required],
            bankAccNumber: ['',Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit(){
        this.submitted = true;
        
        if (this.registerForm.invalid) {
            return;
        }
        

        const user = new RegisterUser
        (
            this.registerForm.value.firstName, 
            this.registerForm.value.lastName, 
            this.registerForm.value.email, 
            this.registerForm.value.password, 
            false, 
            0,
            this.registerForm.value.address,
            this.registerForm.value.city,
            this.registerForm.value.state,
            "Agent",
            this.registerForm.value.pib,
            this.registerForm.value.bankAccNumber
        )
        this.data.Register(user).subscribe(response =>
        {
            if(response) {
                this.receivers = new Array<string>();
                this.receivers.push(this.registerForm.value.email);
                const mail = new Mail
                (
                    "Rent a car - registration ACCEPTED",
                    "",
                    this.receivers,
                    "Your registration request has been accepted. Activate your account by visiting this link:" + "http://localhost:4200/"
                );
                this.data.SentMailForRegistration(mail).subscribe(res => {
                    if(res){    
                        alert('Your registration request has been recieved. Please check your email:\n' + this.registerForm.value.email + ' for confirmation link\n');
                    }
                });
            } else {
                alert('error');
            }
        this.router.navigate(['/login']);
        });
        
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}