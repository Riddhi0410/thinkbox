import Note from "../models/Note.js"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 })  // return the latest one (descending order)
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({ message: "internal server error" })
    }

}
export async function getNoteById(req, res) {
    try {
        const notes = await Note.findById(req.params.id)

        if (!notes) return res.status(404).json({ message: "Note not found" })

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" })
        }
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getNoteById controller", error)
        res.status(500).json({ message: "internal server error" })
    }

}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const newNote = new Note({ title: title, content: content, user: req.user._id })    
        await newNote.save()
        res.status(201).json({ message: "Note create succesfully" })

    } catch (error) {
        console.error("Error in createnote controller", error)
        res.status(500).json({ message: "internal server error" })
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body
        const noteId = req.params.id
        const userId = req.user.id

        const note = await Note.findById(noteId)

        if (!note) return res.status(404).json({ message: "Note not found" })

        if (note.user.toString() !== userId) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        res.status(200).json({ message: "note updated successfully" })

    } catch (error) {
        console.error("error in updatenote controler", error)
        res.status(500).json({ message: "internal server error" })

    }

}

export async function deleteNote(req, res) {
    try {
        const noteId = req.params.id
        const userId = req.user.id

        const note = await Note.findById(noteId);

        if (!node) return res.status(404).json({ message: "Note not found" })

        if (note.user.toString() !== userId) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "note deleted successfully" })
    } catch (error) {
        console.error("error in delete node controler", error)
        res.status(500).json({ message: "internal server error" })

    }

}

