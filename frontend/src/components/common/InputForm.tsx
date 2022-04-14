interface InputFormProps {
    btnTitle: string;
    formInput: string;
    placeHolder: string;
    setFormInput: (formInput: string) => void;
    onSubmitHandler: (formInput: string) => void;
}

function InputForm(props: InputFormProps) {
    const { onSubmitHandler, formInput, setFormInput, placeHolder, btnTitle } = props;

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            onSubmitHandler(formInput);
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
