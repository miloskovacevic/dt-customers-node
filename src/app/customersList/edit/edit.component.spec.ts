import { CustomersListComponent } from './../customersList.component';
import { Observable } from 'rxjs/Observable';
import { CustomersMockService } from './../../services/mock-services/CustomersMockService';
import { CustomersListService } from './../../services/customersList.service';
import { EditComponent } from './edit.component';
import { CommonModule } from '@angular/common';
import { CustomersListRoutingModule } from './../customersList-routing.module';
import { SharedModule } from './../../shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('Edit Customer Component', () => {
    let component: EditComponent;
    let fixture: ComponentFixture<EditComponent>;
    let service: CustomersListService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                CommonModule,
                CustomersListRoutingModule,
                SharedModule,
                BsDatepickerModule.forRoot(),
                NgxSelectModule
            ],
            providers: [
                {provide: CustomersListService, useClass: CustomersMockService}
            ],
            declarations: [
                EditComponent,
                CustomersListComponent
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    // it(`should have as title ''`, () => {
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app.title).toEqual(titleText);
    // });









});
