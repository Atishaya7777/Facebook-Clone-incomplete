

// const body = {
//     id: nanoid(),
//     desc: description,
//     photo: picture.map((img) => img != null && URL.createObjectURL(img)),
//     date: dateNew,
//     userId: userIdentity,
//     like: likeCount,
//     comment: commentCount,
//     comments: actualComments
// }

const savePost = ( postBody ) => {
            // This section is for generating the exact time when the user posts his/her post.
            const date = new Date();
            
            let dateNew = new Intl.DateTimeFormat("en-GB", {
            dateStyle: "full",
            timeStyle: "long",
            }).format(date);
            
            dateNew = dateNew.slice(0, -12);
            
            if (dateNew.slice(dateNew.length - 5, dateNew.length - 3) < 12) {
            dateNew += " AM";
            } else {
            dateNew += " PM";
            }
            
            const requestPosts = {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(postBody)
            }    
            fetch('http://localhost:3000/Posts', requestPosts)
                .then(response => response.json());
        }

export default savePost
