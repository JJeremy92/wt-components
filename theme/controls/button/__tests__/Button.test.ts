import Button from '../Button';

describe('Button', () => {
    describe('when created without information', () => {
        let button: Button;

        beforeEach(() => {
            button = new Button();
        });

        test('it creates a contained button appearance that is empty', () => {
            expect(button.contained.color).toBeUndefined();
        });

        test('it creates an icon button appearance that is empty', () => {
            expect(button.icon.color).toBeUndefined();
        });

        test('it creates an outlined button appearance that is empty', () => {
            expect(button.outlined.color).toBeUndefined();
        });

        test('it creates a text button appearance that is empty', () => {
            expect(button.outlined.color).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let button: Button;

        beforeEach(() => {
            const options = {
                contained: {
                    color: 'blue'
                },
                icon: {
                    color: 'purple'
                },
                outlined: {
                    color: 'red'
                },
                text: {
                    color: 'yellow'
                }
            };
            button = new Button(options);
        });

        test('it passes the contained button options to the contained button appearance', () => {
            expect(button.contained.color).toBe('blue');
        });

        test('it passes the icon button options to the icon button appearance', () => {
            expect(button.icon.color).toBe('purple');
        });

        test('it passes the outlined button options to the outlined button appearance', () => {
            expect(button.outlined.color).toBe('red');
        });

        test('it passes the text button options to the text button appearance', () => {
            expect(button.text.color).toBe('yellow');
        });
    });

    describe('when created from a base control appearance', () => {
        let button: Button;

        beforeEach(() => {
            const base = new Button({
                contained: {
                    color: 'blue'
                },
                icon: {
                    color: 'purple'
                },
                outlined: {
                    color: 'red'
                },
                text: {
                    color: 'yellow'
                }
            });
            button = new Button({}, base);
        });

        test('it uses the base contained button appearance to construct the contained button appearance', () => {
            expect(button.contained.color).toBe('blue');
        });

        test('it uses the base icon button appearance to construct the icon button appearance', () => {
            expect(button.icon.color).toBe('purple');
        });

        test('it uses the base outlined button appearance to construct the outlined button appearance', () => {
            expect(button.outlined.color).toBe('red');
        });

        test('it uses the base text button appearance to construct the text button appearance', () => {
            expect(button.text.color).toBe('yellow');
        });
    });

    describe('when created from options with a fallback of a base button appearance', () => {
        let button: Button;

        beforeEach(() => {
            const options = {
                contained: {
                    dark: true
                },
                icon: {
                    depressed: true
                },
                outlined: {
                    rounded: true
                },
                text: {
                    tile: true
                }
            };
            const base = new Button({
                contained: {
                    color: 'blue'
                },
                icon: {
                    color: 'purple'
                },
                outlined: {
                    color: 'red'
                },
                text: {
                    color: 'yellow'
                }
            });
            button = new Button(options, base);
        });

        test('it constructs the contained button appearance by applying the contained button options on top of the base contained button appearance', () => {
            expect(button.contained.color).toBe('blue');
            expect(button.contained.dark).toBe(true);
        });

        test('it constructs the icon button appearance by applying the icon button options on top of the base icon button appearance', () => {
            expect(button.icon.color).toBe('purple');
            expect(button.icon.depressed).toBe(true);
        });

        test('it constructs the outlined button appearance by applying the outlined button options on top of the base outlined button appearance', () => {
            expect(button.outlined.color).toBe('red');
            expect(button.outlined.rounded).toBe(true);
        });

        test('it constructs the text button appearance by applying the text button options on top of the base text button appearance', () => {
            expect(button.text.color).toBe('yellow');
            expect(button.text.tile).toBe(true);
        });
    });
});
