import { Observable } from 'rxjs/Observable';
import { CustomersMockService } from './../services/mock-services/CustomersMockService';
import { CustomersListService } from './../services/customersList.service';
import { EditComponent } from './edit/edit.component';
import { CommonModule } from '@angular/common';
import { CustomersListRoutingModule } from './customersList-routing.module';
import { SharedModule } from './../shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { CustomersListComponent } from './customersList.component';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('Customers List Component', () => {
    let component: CustomersListComponent;
    let fixture: ComponentFixture<CustomersListComponent>;
    let titleText = 'Webtrekk Customers List';
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
                CustomersListComponent,
                EditComponent
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomersListComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'Webtrekk Customers List'`, () => {
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual(titleText);
    });

    it('should render title to component html template\'s h4 element', () => {
        fixture.detectChanges();
        let debugElement = fixture.debugElement.query(By.css('#title'));
        let el: HTMLElement =  debugElement.nativeElement;
        expect(el.innerText).toContain(titleText);
    });

    it('should have rendered ngx-datatable component', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('ngx-datatable')).not.toBe(null);
    });

    it('should have called method getData when ngAfterContentInit executed', () => {
        spyOn(component, 'getData');
        component.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.getData).toHaveBeenCalled();
    });

    it('should have called service method getCustomers() when ngAfterContentInit executed', async(() => {
        let service = TestBed.get(CustomersListService);
        component.ngAfterContentInit();
        fixture.detectChanges();
        expect(service.getCustomers.toHaveBeenCalled);
    }));

    // it('should return Customers from server', () => {
    //     let service = TestBed.get(CustomersListService);
    //     spyOn(service, 'getCustomers').and.returnValue(new Promise( (resolve, reject) => {
    //         resolve({message: 'Customers are here!', customers: [1, 2, 3]});
    //     }));
    //     fixture.detectChanges();
    //     expect(component.data.length).toBe(3);
    // });

    it('should call method onRouteClick on add customer button click', async( () => {
        spyOn(component, 'onRouteClick');
        fixture.detectChanges();
        let button = fixture.debugElement.query(By.css('#add-customer'));
        let el: HTMLElement = button.nativeElement;
        el.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.onRouteClick).toHaveBeenCalled();
        });
    }));
});
