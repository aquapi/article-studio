export default ({ messages = [] }) =>
    // Error: Message doubles itself
    <ul id="messages">
        {messages.map(data =>
            <li style={{ textAlign: data.textAlign }} key={Date.now()}>
                <p>{data.msg}</p>
                <div className="username">{data.user}</div>
            </li>
        )}
    </ul>;