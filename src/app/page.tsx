"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  Menu,
  MenuList,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { CalendarIcon, AttachmentIcon } from "@chakra-ui/icons";

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
}

const services: Service[] = [
  {
    id: 1,
    name: "Classic Manicure",
    description:
      "Includes filing, moisturizing, and permanent polish application.",
    category: "Hands and Feet",
  },
  {
    id: 2,
    name: "Spa Pedicure",
    description: "Spa pedicure with paraffin bath for soft and relaxed feet.",
    category: "Hands and Feet",
  },
  {
    id: 3,
    name: "Cut and Style",
    description: "Custom haircut plus washing and styling.",
    category: "Hair",
  },
  {
    id: 4,
    name: "Full Color",
    description: "Full hair coloring with ammonia-free products.",
    category: "Hair",
  },
  {
    id: 5,
    name: "Deep Tissue Massage",
    description: "Intense massage to alleviate muscle tension.",
    category: "Massage and Spa",
  },
  {
    id: 6,
    name: "Anti-Aging Facial",
    description: "Rejuvenating facial treatment with natural products.",
    category: "Facial Care",
  },
  {
    id: 7,
    name: "Waxing",
    description: "Body waxing for smooth, hair-free skin.",
    category: "Hair Removal",
  },
  {
    id: 8,
    name: "Hair Treatment",
    description: "Repairing treatment for damaged or dyed hair.",
    category: "Hair",
  },
  {
    id: 9,
    name: "Professional Makeup",
    description: "Makeup services for special events.",
    category: "Makeup",
  },
  {
    id: 10,
    name: "Facial Cleansing",
    description:
      "Deep cleansing with impurity extraction and mask application.",
    category: "Facial Care",
  },
];

interface Slot {
  date: string;
  serviceId: number;
  availableTimeslots: string[];
}

const slots: Slot[] = [
  {
    date: "2024-04-26",
    serviceId: 3,
    availableTimeslots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  },
  {
    date: "2024-04-27",
    serviceId: 3,
    availableTimeslots: ["09:00", "09:30", "10:00", "10:30", "11:00"],
  },
];

export default function Home() {
  const [servicioSeleccionado, setServicioSeleccionado] =
    useState<Service | null>(null);
  const [pantallaActual, setPantallaActual] = useState<string>("tratamiento");
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<{ [key: string]: Service[] }>(
    {}
  );
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false); // Estado del acordeón

  useEffect(() => {
    // Organizar servicios por categoría al montar el componente
    const categoriasOrganizadas: { [key: string]: Service[] } = {};
    services.forEach((service) => {
      if (!categoriasOrganizadas[service.category]) {
        categoriasOrganizadas[service.category] = [];
      }
      categoriasOrganizadas[service.category].push(service);
    });
    setCategorias(categoriasOrganizadas);
  }, []);

  // Función para manejar la selección de un servicio
  const handleSelectService = (service: Service) => {
    setServicioSeleccionado(service);
  };

  // Función para manejar la selección de un horario
  const handleSelectTime = (time: string) => {
    setHoraSeleccionada(time);
  };

  // Función para avanzar a la pantalla de selección de slots
  const handleContinuar = () => {
    setPantallaActual("slots");
    setIsOpenAccordion(true);
  };

  // Función para volver a la pantalla de selección de tratamiento
  const handleVolver = () => {
    setPantallaActual("tratamiento");
    setHoraSeleccionada(null);
  };

  // Función para confirmar la reserva
  const handleConfirmarReserva = () => {
    console.log("Reserva confirmada");
    // Aquí iría la lógica para confirmar la reserva
  };

  return (
    <main className={styles.main}>
      {pantallaActual === "tratamiento" ? (
        <div>
          <h2>Seleccionar Tratamiento</h2>
          <Progress value={25} colorScheme="teal" />
          <Accordion allowToggle defaultIndex={isOpenAccordion ? 0 : -1}>
            {Object.entries(categorias).map(([categoria, servicios]) => (
              <AccordionItem key={categoria}>
                <h2>
                  <AccordionButton>
                    {categoria}
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ul>
                    {servicios.map((servicio) => (
                      <Box key={servicio.id}>
                        {servicio.name} {servicio.description}
                        <Button
                          p={2}
                          mb={2}
                          bg={
                            servicioSeleccionado?.id === servicio.id
                              ? "teal.50"
                              : "white"
                          }
                          borderWidth={1}
                          borderRadius="md"
                          colorScheme="teal"
                          onClick={() => handleSelectService(servicio)}
                          size="sm">
                          Seleccionar
                        </Button>
                      </Box>
                    ))}
                  </ul>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Button
            onClick={handleContinuar}
            colorScheme="teal"
            size="sm"
            mt={4}
            isDisabled={!servicioSeleccionado} // Botón deshabilitado si no hay servicio seleccionado
          >
            Continuar
          </Button>
        </div>
      ) : pantallaActual === "slots" ? (
        // Pantalla de selección de slots
        <div>
          <h2>Seleccionar Slot</h2>
          <Progress value={50} colorScheme="teal" />
          {/* Renderizar lista de slots */}
          {slots.map((slot) => (
            <Box key={slot.date} p={5} mt={5}>
              <p>{new Date(slot.date).toLocaleDateString("es-ES")}</p>
              <SimpleGrid columns={2} spacing={2}>
                {slot.availableTimeslots.map((time, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSelectTime(time)}
                    colorScheme={horaSeleccionada === time ? "teal" : "gray"}
                    variant="outline"
                    size="sm"
                    my={2}>
                    {time}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>
          ))}
          {/* Botón para volver a la pantalla de selección de tratamiento */}
          <Button
            onClick={handleVolver}
            colorScheme="gray"
            size="sm"
            mt={4}
            mr={2}>
            Volver
          </Button>
          {/* Botón para avanzar a la pantalla de resumen */}
          <Button
            onClick={() => setPantallaActual("resumen")}
            colorScheme="teal"
            size="sm"
            mt={4}
            isDisabled={!horaSeleccionada} // Deshabilitar botón si no hay hora seleccionada
          >
            Continuar
          </Button>
        </div>
      ) : (
        // Pantalla de resumen
        <div>
          <Progress value={75} colorScheme="teal" />
          <h2>Resumen de Selección</h2>
          <p>Servicio seleccionado: {servicioSeleccionado?.name}</p>
          <p>Horario seleccionado: {horaSeleccionada}</p>
          {/* Botón para volver a la pantalla de selección de slots */}
          <Button
            onClick={() => setPantallaActual("slots")}
            colorScheme="gray"
            size="sm"
            mt={4}
            mr={2}>
            Volver
          </Button>
          {/* Botón para confirmar la reserva */}
          <Button
            onClick={handleConfirmarReserva}
            colorScheme="teal"
            size="sm"
            mt={4}>
            Confirmar Reserva
          </Button>
        </div>
      )}
      <Menu>
        {/* Menú con íconos para otras acciones */}
        <MenuList>
          <CalendarIcon />
          Mis turnos
        </MenuList>
        <MenuList>
          <AttachmentIcon />
          Reservar
        </MenuList>
      </Menu>
    </main>
  );
}
