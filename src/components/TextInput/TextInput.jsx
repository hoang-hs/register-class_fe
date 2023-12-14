const TextInput = ({ 
    type = 'text',
    label,
    value = '',
    setValue = () => null
}) => (
    <div className='w-100'>
        <label className='form-label fw-semibold'>{label}</label>
        <input 
            type={type}
            className="form-control"
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    </div>
)

export default TextInput;