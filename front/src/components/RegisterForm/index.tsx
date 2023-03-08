import "./style.scss";

interface RegisterFormProps {
  corporate_name: string;
  cnpj: string;
  opening_date: string;
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement: string;
    district: string;
    state: string;
  };
}

export function RegisterForm(props: RegisterFormProps) {
  // const [isDisabled, setIsDisabled] = useState(true);
  // const [companyName, setCompanyName] = useState("");
  // const [cnpj, setCnpj] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [cep, setCep] = useState("");
  // return (
  //   <div className="container">
  //     <h1>Cadastrar Prestador de Serviços</h1>
  //     <form
  //       className="general-informations"
  //       action=""
  //     >
  //       <h4>Informações gerais</h4>
  //       <label>Razão Social</label>
  //       <input
  //         placeholder="Razão social"
  //         type="text"
  //       />
  //       <label>cnpj</label>
  //       <input
  //         placeholder="cnpj"
  //         type="text"
  //       />
  //       <label>data de abertura</label>
  //       <input
  //         placeholder="data de abertura"
  //         type="date"
  //       />
  //       <label>telefone</label>
  //       <input type="text" />
  //       <label>email</label>
  //       <input type="text" />
  //     </form>
  //     <form className="address-informations">
  //       <h4>Endereço</h4>
  //       <input
  //         type="text"
  //         placeholder="CEP"
  //       />
  //       <input
  //         type="text"
  //         disabled={isDisabled}
  //         placeholder="Logradouro"
  //       />
  //       <input
  //         type="text"
  //         disabled={isDisabled}
  //         placeholder="Número"
  //       />
  //       <input
  //         type="text"
  //         disabled={isDisabled}
  //         placeholder="complemento"
  //       />
  //       <input
  //         type="text"
  //         disabled={isDisabled}
  //         placeholder="bairro"
  //       />
  //       <input
  //         type="text"
  //         disabled={isDisabled}
  //         placeholder="estado"
  //       />
  //     </form>
  //   </div>
  // );
}
