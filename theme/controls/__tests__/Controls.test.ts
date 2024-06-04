import Controls from '../Controls';

describe('Controls', () => {
    describe('when created without information', () => {
        let controls: Controls;

        beforeEach(() => {
            controls = new Controls();
        });

        test('it creates a button appearance that is empty', () => {
            expect(controls.button.contained.color).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let controls: Controls;

        beforeEach(() => {
            const options = {
                button: {
                    contained: {
                        color: 'primary',
                    },
                },
            };
            controls = new Controls(options);
        });

        test('it passes the button options to the button appearance', () => {
            expect(controls.button.contained.color).toBe('primary');
        });
    });

    describe('when created from a base control appearance', () => {
        let controls: Controls;

        beforeEach(() => {
            const base = new Controls({
                button: {
                    contained: {
                        color: 'primary',
                    },
                },
            });
            controls = new Controls({}, base);
        });

        test('it uses the base button appearance to construct the button appearance', () => {
            expect(controls.button.contained.color).toBe('primary');
        });
    });

    describe('when created from options with a fallback of a base control appearance', () => {
        let controls: Controls;

        beforeEach(() => {
            const options = {
                button: {
                    contained: {
                        color: 'secondary',
                    },
                },
            };
            const base = new Controls({
                button: {
                    contained: {
                        color: 'primary',
                        rounded: true,
                    },
                },
            });
            controls = new Controls(options, base);
        });

        test('it constructs the button appearance by applying the button options on top of the base button appearance', () => {
            expect(controls.button.contained.color).toBe('secondary');
            expect(controls.button.contained.rounded).toBe(true);
        });
    });
});
