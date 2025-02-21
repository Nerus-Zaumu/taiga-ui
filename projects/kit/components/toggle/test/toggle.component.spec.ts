import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TuiToggleModule, tuiToggleOptionsProvider} from '@taiga-ui/kit';
import {configureTestSuite, TuiPageObject} from '@taiga-ui/testing';

describe(`Toggle`, () => {
    @Component({
        template: `
            <tui-toggle
                [formControl]="control"
                [showIcons]="showIcons"
                [showLoader]="showLoader"
            ></tui-toggle>
        `,
    })
    class TestComponent {
        control = new FormControl();
        showIcons = false;
        showLoader = false;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let pageObject: TuiPageObject<TestComponent>;
    const testContext = {
        get prefix() {
            return `tui-toggle__`;
        },
    };

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, TuiToggleModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        pageObject = new TuiPageObject(fixture);
        testComponent = fixture.componentInstance;
    });

    it(`If value is not set, click changes the value to true`, () => {
        fixture.detectChanges();

        clickOnToggle();

        expect(testComponent.control.value).toBe(true);
    });

    it(`If value === false, click changes the value to true`, () => {
        testComponent.control.setValue(false);
        fixture.detectChanges();

        clickOnToggle();

        expect(testComponent.control.value).toBe(true);
    });

    it(`If value === true, click changes the value to false`, () => {
        testComponent.control.setValue(true);
        fixture.detectChanges();

        clickOnToggle();

        expect(testComponent.control.value).toBe(false);
    });

    it(`If the control is disabled, the click does not change the value`, () => {
        testComponent.control.setValue(false);
        testComponent.control.disable();
        fixture.detectChanges();

        clickOnToggle();

        expect(testComponent.control.value).toBe(false);
    });

    it(`If the control is un-disabled again, click reverses the value`, () => {
        testComponent.control.setValue(false);
        testComponent.control.disable();
        fixture.detectChanges();

        testComponent.control.enable();
        fixture.detectChanges();

        clickOnToggle();

        expect(testComponent.control.value).toBe(true);
    });

    describe(`Icons`, () => {
        describe(`showIcons === false`, () => {
            beforeEach(() => {
                testComponent.showIcons = false;
            });

            it(`Icons are hidden when toggle is "disabled"`, () => {
                testComponent.control.setValue(false);
                fixture.detectChanges();

                checkIconVisibility(`${testContext.prefix}check-icon`, false);
                checkIconVisibility(`${testContext.prefix}cancel-icon`, false);
            });

            it(`Icons are hidden when toggle is "on"`, () => {
                testComponent.control.setValue(true);
                fixture.detectChanges();

                checkIconVisibility(`${testContext.prefix}check-icon`, false);
                checkIconVisibility(`${testContext.prefix}cancel-icon`, false);
            });
        });

        describe(`showIcons === true`, () => {
            beforeEach(() => {
                testComponent.showIcons = true;
            });

            it(`Icons are shown when toggle is "disabled"`, () => {
                testComponent.control.setValue(false);
                fixture.detectChanges();

                // If icons are enabled, then both are added to the DOM at once -
                // implementation feature for smooth animation
                checkIconVisibility(`${testContext.prefix}check-icon`, true);
                checkIconVisibility(`${testContext.prefix}cancel-icon`, true);
            });

            it(`Icons are shown when toggle is "on"`, () => {
                testComponent.control.setValue(true);
                fixture.detectChanges();

                checkIconVisibility(`${testContext.prefix}check-icon`, true);
                checkIconVisibility(`${testContext.prefix}cancel-icon`, true);
            });
        });
    });

    describe(`Loader`, () => {
        describe(`showLoader === false`, () => {
            beforeEach(() => {
                testComponent.showLoader = false;
            });

            it(`Icons are hidden when toggle is "disabled"`, () => {
                testComponent.control.setValue(false);
                fixture.detectChanges();

                checkIconVisibility(`${testContext.prefix}check-icon`, false);
                checkIconVisibility(`${testContext.prefix}cancel-icon`, false);
            });

            it(`Icons are hidden when toggle is "on"`, () => {
                testComponent.control.setValue(true);
                fixture.detectChanges();

                checkIconVisibility(`${testContext.prefix}check-icon`, false);
                checkIconVisibility(`${testContext.prefix}cancel-icon`, false);
            });
        });

        describe(`showLoader === true`, () => {
            beforeEach(() => {
                testComponent.showLoader = true;
                testComponent.showIcons = true;
            });

            it(`Icons are hidden when toggle is disabled, loader takes precedence over them`, () => {
                testComponent.control.setValue(false);
                fixture.detectChanges();

                checkIconVisibility(`${testContext.prefix}check-icon`, false);
                checkIconVisibility(`${testContext.prefix}cancel-icon`, false);
            });

            it(`Icons are hidden when toggle is on, loader takes precedence over them`, () => {
                testComponent.control.setValue(true);
                fixture.detectChanges();

                checkIconVisibility(`${testContext.prefix}check-icon`, false);
                checkIconVisibility(`${testContext.prefix}cancel-icon`, false);
            });
        });
    });

    function clickOnToggle(): void {
        const checkbox = pageObject.getByAutomationId(`${testContext.prefix}checkbox`);

        checkbox!.nativeElement.click();
    }

    function checkIconVisibility(
        tuiIconAutomationId: string,
        expectedVisibility: boolean,
    ): void {
        const icon = pageObject.getByAutomationId(tuiIconAutomationId);

        if (expectedVisibility) {
            expect(icon).not.toBeNull();
        } else {
            expect(icon).toBeNull();
        }
    }
});

describe(`Toggle with TUI_TOGGLE_OPTIONS`, () => {
    @Component({
        template: `
            <tui-toggle
                [formControl]="control"
                [showLoader]="showLoader"
            ></tui-toggle>
        `,
    })
    class TestComponent {
        control = new FormControl();
        showLoader = false;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let pageObject: TuiPageObject<TestComponent>;
    const testContext = {
        get prefix() {
            return `tui-toggle__`;
        },
    };

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, TuiToggleModule],
            declarations: [TestComponent],
            providers: [
                tuiToggleOptionsProvider({
                    showIcons: true,
                }),
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        pageObject = new TuiPageObject(fixture);
        testComponent = fixture.componentInstance;
    });

    describe(`Icons`, () => {
        describe(`showIcons === true`, () => {
            it(`Icons are shown when toggle is "disabled"`, () => {
                testComponent.control.setValue(false);
                fixture.detectChanges();

                // If icons are enabled, then both are added to the DOM at once -
                // implementation feature for smooth animation
                isIconVisible(`${testContext.prefix}check-icon`);
                isIconVisible(`${testContext.prefix}cancel-icon`);
            });

            it(`Icons are shown when toggle is "on"`, () => {
                testComponent.control.setValue(true);
                fixture.detectChanges();

                isIconVisible(`${testContext.prefix}check-icon`);
                isIconVisible(`${testContext.prefix}cancel-icon`);
            });
        });
    });

    describe(`Loader`, () => {
        describe(`showLoader === false`, () => {
            beforeEach(() => {
                testComponent.showLoader = false;
            });

            it(`Icons are shown when toggle is "disabled"`, () => {
                testComponent.control.setValue(false);
                fixture.detectChanges();

                isIconVisible(`${testContext.prefix}check-icon`);
                isIconVisible(`${testContext.prefix}cancel-icon`);
            });

            it(`Icons are shown when toggle is "on"`, () => {
                testComponent.control.setValue(true);
                fixture.detectChanges();

                isIconVisible(`${testContext.prefix}check-icon`);
                isIconVisible(`${testContext.prefix}cancel-icon`);
            });
        });
    });

    function isIconVisible(tuiIconAutomationId: string): void {
        const icon = pageObject.getByAutomationId(tuiIconAutomationId);

        expect(icon).not.toBeNull();
    }
});
