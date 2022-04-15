import React from 'react';
interface InputFormProps {
    btnTitle: string;
    placeHolder: string;
    onSubmitHandler: (formInput: string) => Promise<void>;
}

/**
 * Reusable component for a input field with submit handler.
 *
 * @param {InputFormProps} props
 */
function InputForm(props: InputFormProps) {
    const { onSubmitHandler, placeHolder, btnTitle } = props;
    const [formInput, setFormInput] = React.useState<string>('');

    return (
        <form onSubmit={async (event) => {
            event.preventDefault();
            await onSubmitHandler(formInput);
            setFormInput('');
        }}>
            <input
                name="title"
                value={formInput}
                placeholder={placeHolder}
                onChange={(event) => setFormInput(event.target.value)}
            />
            <button type="submit">{btnTitle}</button>
        </form>
    )
}

export default InputForm;
