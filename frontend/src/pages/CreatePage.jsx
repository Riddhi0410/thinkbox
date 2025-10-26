import { ArrowLeftIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router"
import toast from "react-hot-toast"
import api from "../lib/axios"

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("please sign up or log in")
      navigate("/signup")
    }
  }, [navigate])

  const handlesubmit = async (e) => {
    (e).preventDefault()

    if (!title.trim() || !content) {
      toast.error("All the fields are required")
      return
    }
    setLoading(true)
    try {
      await api.post("/notes", {
        title, content
      })
      toast.success("Note created successfully!")
      navigate("/")
    } catch (error) {
      console.log(error)
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast")
      } else {
        toast.error("Failed to create note")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="conatainer mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handlesubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text py-3">Title</span>
                  </label><br />
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text py-3">Content</span>
                  </label><br />
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-40 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default CreatePage