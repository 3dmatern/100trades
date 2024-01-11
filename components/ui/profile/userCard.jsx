export default function UserCard({ currentUser }) {
    return (
        <div className="rounded-xl border border-gray-400 mb-3 py-8 px-5 text-center">
            <h4>
                {currentUser.firstname} {currentUser.lastname}
            </h4>
            <p className="text-secondary mb-1">{currentUser.email}</p>
        </div>
    );
}
