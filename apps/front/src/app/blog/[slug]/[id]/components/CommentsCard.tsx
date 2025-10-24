import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserIcon } from '@heroicons/react/16/solid'
import { CommentEntity } from '@/lib/types/modelTypes'
import { Textarea } from '@/components/ui/textarea'
import { updateComment } from '@/lib/actions/commentActions'

type Props = {
  comment: CommentEntity
  currentUserId?: number|undefined,
  onSave: (commentId: number, updatedContent: string) => void // Handler passed from parent to save modifications
  ondelete: (commentId: number) => void
}

const CommentsCard = ({ comment, currentUserId, onSave, ondelete }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const isUserComment = comment.author.id === currentUserId

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const handleModify = () => {
    setDropdownOpen(false)
    setIsEditing(true)
  }

  const handleDelete =async () => {
    setDropdownOpen(false)
    await ondelete(comment.id)
  
    console.log('Delete comment', comment.id)
  }

  const handleSave = async () => {
    await onSave(comment.id, editedContent);    
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedContent(comment.content) // Revert edits
    setIsEditing(false)
  }

  return (
    <div className="p-2 rounded max-w-full relative">
      <div className="flex gap-4">
        <Avatar className="border-2 size-12">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>
            <UserIcon className="w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="flex items-center">
            {comment.author.name.slice(0, 15)}
            <span className="ml-2 text-gray-500 text-xs">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>

            {isUserComment && !isEditing && (
              <div className="relative ml-auto">
                <button
                  onClick={toggleDropdown}
                  aria-label="Toggle options menu"
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  &#x22EE;
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                    <button
                      className="w-full text-left px-3 py-1 hover:bg-gray-100"
                      onClick={handleModify}
                    >
                      Modify
                    </button>
                    <button
                      className="w-full text-left px-3 py-1 hover:bg-gray-100 text-red-600"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </p>

          {isEditing ? (
            <div className="mt-1 flex-col items-center gap-2">
              <Textarea
               
                className="flex-1 border p-1 rounded"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className='flex gap-2 mt-2'>

              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                Cancel
              </button>
                  </div>
            </div>
          ) : (
            <p className="mt-1 text-gray-700 text-sm">{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentsCard
