import React, { useCallback, useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {createLinkToken, exchangePublicToken} from '@/lib/actions/user.actions'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  console.log("loaded PlaidLink and the user here is: ",user)
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await  createLinkToken(user)
      setToken(data?.linkToken)
      console.log("Performed the Use Effect function in PlaidLink.tsx",data)
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });

      router.push("/");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    onSuccess,
    token,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button className="plaidlink-">Connect bank</Button>
      ) : (
        <Button className="plaidlink-">Connect bank</Button>
      )}
    </>
  );
};

export default PlaidLink;
