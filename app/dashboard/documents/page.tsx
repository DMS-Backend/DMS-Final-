"use client"

import type React from "react"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { addDocument, updateDocument, deleteDocument } from "@/lib/redux/features/documents-slice"
import { useAuth } from "@/lib/auth-context"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Plus, FileText, Pencil, Trash2, Download, Share } from "lucide-react"

export default function DocumentsPage() {
  const { user } = useAuth()
  const documents = useSelector((state: RootState) => state.documents.documents)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    type: "document",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      type: value,
    })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      type: "document",
    })
    setEditId(null)
  }

  const openCreateDialog = () => {
    resetForm()
    setOpen(true)
  }

  const openEditDialog = (doc: any) => {
    setFormData({
      title: doc.title,
      description: doc.description,
      content: doc.content,
      type: doc.type,
    })
    setEditId(doc.id)
    setOpen(true)
  }

  const handleSubmit = () => {
    const now = new Date().toISOString()

    if (editId) {
      // Update existing document
      dispatch(
        updateDocument({
          id: editId,
          title: formData.title,
          description: formData.description,
          content: formData.content,
          type: formData.type,
          updatedAt: now,
          updatedBy: user?.id || "",
        }),
      )
    } else {
      // Create new document
      dispatch(
        addDocument({
          id: Date.now().toString(),
          title: formData.title,
          description: formData.description,
          content: formData.content,
          type: formData.type,
          createdAt: now,
          updatedAt: now,
          createdBy: user?.id || "",
          updatedBy: user?.id || "",
        }),
      )
    }

    setOpen(false)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      dispatch(deleteDocument(id))
    }
  }

  const myDocuments = documents.filter((doc) => doc.createdBy === user?.id)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documents</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Create Document
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="my">My Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <DocumentsTable documents={documents} onEdit={openEditDialog} onDelete={handleDelete} />
        </TabsContent>
        <TabsContent value="my">
          <DocumentsTable documents={myDocuments} onEdit={openEditDialog} onDelete={handleDelete} />
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Document" : "Create New Document"}</DialogTitle>
            <DialogDescription>
              {editId
                ? "Update the document details below."
                : "Fill in the document details below to create a new document."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                className="col-span-3"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={formData.type} onValueChange={handleSelectChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                className="col-span-3"
                rows={8}
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              {editId ? "Save Changes" : "Create Document"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DocumentsTable({
  documents,
  onEdit,
  onDelete,
}: {
  documents: any[]
  onEdit: (doc: any) => void
  onDelete: (id: string) => void
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    {doc.title}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {doc.type}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(doc.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(doc)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onDelete(doc.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No documents found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
