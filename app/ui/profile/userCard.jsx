export default function UserCard({ user }) {
    return (
        <div className="rounded-xl border border-gray-400 mb-3 py-8 px-5 text-center">
            {/* <img
                src={user.image || "./person-circle.svg"}
                className="rounded-full mx-auto md:w-36 w-20"
            /> */}
            {/* <div className="mt-5"> */}
            <h4>
                {user.firstname} {user.lastname}
            </h4>
            <p className="text-secondary mb-1">{user.email}</p>
            {/* </div> */}
        </div>
    );
}
