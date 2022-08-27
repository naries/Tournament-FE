import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store";

const Home = () => {
  const [input, setInput] = useState<{
    amount: string;
  }>({
    amount: "",
  });
  const [errors, setErrors] = useState<{ amount: string } | null>();
  const { status, data } = useSelector((state: RootState) => state.home);
  const {
    status: generateLinkStatus,
    data: { generatedLink },
  } = useSelector((state: RootState) => state.payment);
  const {
    auth: { signedOut },
    home: { getUserInformation },
    payment: { getLink },
  } = useDispatch<Dispatch>();

  useEffect(() => {
    getUserInformation();
  }, []);

  const validate = () => {
    if (!input.amount.trim()) {
      setErrors({ amount: "Amount field is empty" });
      return false;
    }
    return true;
  };
  const generate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) getLink(input.amount);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div>
      <div>Home</div>
      {status === "loading" && <div> Loading </div>}

      {status === "error" && (
        <div> Something went wrong. Reload page and try again. </div>
      )}

      {status === "success" && (
        <div>
          <div>Welcome {data?.managerDetails?.player_first_name}</div>
          <div>Team Name: {data?.managerDetails?.name} </div>
          <div>Current Gameweek {data?.managerDetails?.current_event}</div>
          <div>Point: {data?.managerDetails?.summary_event_points}</div>
          <div>Wallet Information:</div>
          <div>Wallet Balance: ₦ {data?.walletInformation?.balance}</div>
          {generateLinkStatus === "generating_link" && (
            <div>Generating link...</div>
          )}
          {generateLinkStatus === "generate_link_success" && (
            <div>
              Click this link to make payment:
              <a href={generatedLink?.authorization_url}>
                {generatedLink?.authorization_url}
              </a>
            </div>
          )}
          <form onSubmit={generate}>
            <label htmlFor="email">Email Address</label>
            <input
              id="amount"
              name="amount"
              onChange={handleChange}
              placeholder="Amount"
              value={input.amount}
            />
            <button
              disabled={generateLinkStatus === "generating_link"}
              type="submit"
            >
              Generate Payment Link
            </button>
            {!!errors?.amount && <div>{errors?.amount}</div>}
          </form>
          <div></div>
        </div>
      )}
      <button onClick={() => signedOut()}>Sign out</button>
    </div>
  );
};

export default Home;
