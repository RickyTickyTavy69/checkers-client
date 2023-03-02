import React from "react";

interface Iprops{
    username: string | null;
}

const Profile: React.FC<Iprops> = ({username}) => {

    // here I should see if there is an avatar from discord and render it with conditional rendering

    return (
        <div>
                <button>
                    Logged in as {username} :)
                </button>
        </div>
    )
}

export default Profile;