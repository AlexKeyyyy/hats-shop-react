import React, {useCallback, useEffect} from "react";
import './Form.css';
import {useTelegram} from "../../hooks/useTg";

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            name,
            email,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [name, email, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text:'Отправить данные'
        })
    }, []);

    useEffect(() => {
        if (!name || !email) {
            tg.MainButton.hide()
        }
        else {
            tg.MainButton.show();
        }
    }, [name, email]);

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type='text'
                placeholder={'Как к Вам обращаться?'}
                value={name}
                onChange={onChangeName}
            />
            <input
                className={'input'}
                type='text'
                placeholder={'Введите вашу почту'}
                value={name}
                onChange={onChangeEmail}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ.лицо</option>
                <option value={'legal'}>Юр.лицо</option>
            </select>
        </div>
    )
}

export default Form;
