"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import MultiSelect from "@/components/ui/MultiSelect";
import Select from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import type { PriorityLevel, TaskStatus, User } from "@/types";
import { useTaskStore } from "@/stores/task-store";
import { priorityLabels } from "@/utils/task-grouping";
import { styles } from "./styles";

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  listId: string;
  statuses: TaskStatus[];
  users: User[];
  defaultStatusId?: string;
}

const NewTaskModal = ({
  open,
  onClose,
  listId,
  statuses,
  users,
  defaultStatusId,
}: NewTaskModalProps) => {
  const createTask = useTaskStore((state) => state.createTask);
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [statusId, setStatusId] = useState(defaultStatusId ?? statuses[0]?.id ?? "");
  const [priority, setPriority] = useState<PriorityLevel>("normal");
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<string | null>(null);

  const reset = () => {
    setName("");
    setStatusId(defaultStatusId ?? statuses[0]?.id ?? "");
    setPriority("normal");
    setAssigneeIds([]);
    setDueDate(null);
  };

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    createTask({
      listId,
      name: trimmed,
      statusId,
      priority,
      assigneeIds,
      dueDate,
    });
    showToast({ title: "Tarea creada", description: trimmed, variant: "success" });
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Nueva tarea">
      <div className={styles.form}>
        <Input
          autoFocus
          label="Nombre"
          placeholder="¿Qué hay que hacer?"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleCreate();
          }}
        />
        <div className={styles.grid}>
          <Select
            label="Estado"
            options={statuses.map((status) => ({ value: status.id, label: status.name }))}
            value={statusId}
            onChange={(event) => setStatusId(event.target.value)}
          />
          <Select
            label="Prioridad"
            options={(Object.keys(priorityLabels) as PriorityLevel[]).map((level) => ({
              value: level,
              label: priorityLabels[level],
            }))}
            value={priority}
            onChange={(event) => setPriority(event.target.value as PriorityLevel)}
          />
        </div>
        <MultiSelect
          label="Asignados"
          options={users.map((user) => ({
            value: user.id,
            label: user.name,
            color: user.avatarColor,
          }))}
          values={assigneeIds}
          onChange={setAssigneeIds}
        />
        <DatePicker
          label="Vencimiento"
          value={dueDate}
          onChange={(event) =>
            setDueDate(event.target.value ? new Date(event.target.value).toISOString() : null)
          }
        />
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={!name.trim()} onClick={handleCreate}>
            Crear tarea
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewTaskModal;
