// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function Home() {
  const [size, setSize] = useState(8); // Ajuste o tamanho conforme necessário
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [keyList, setKeyList] = useState([]);
  const [newPassword, setNewPassword] = useState('');

  // Novos estados
  const [keyOption, setKeyOption] = useState(''); // 'generate', 'manual', 'database'
  const [manualPublicKeyE, setManualPublicKeyE] = useState('');
  const [manualPublicKeyN, setManualPublicKeyN] = useState('');
  const [manualPrivateKeyD, setManualPrivateKeyD] = useState('');
  const [manualPrivateKeyN, setManualPrivateKeyN] = useState('');

  const [isGeneratingKeys, setIsGeneratingKeys] = useState(false);

  // Verifica se já existe uma senha cadastrada
  useEffect(() => {
    const checkPassword = async () => {
      const response = await fetch('/api/check-password');
      const data = await response.json();
      setIsPasswordSet(data.hasPassword);
    };

    checkPassword();
  }, []);

  // Cadastrar uma nova senha
  const registerPassword = async () => {
    if (!newPassword) {
      alert('Por favor, insira uma senha.');
      return;
    }

    try {
      const response = await fetch('/api/register-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Senha cadastrada com sucesso.');
        setIsPasswordSet(true);
      } else {
        alert(data.error || 'Erro ao cadastrar a senha.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar a senha:', error);
      alert('Erro ao cadastrar a senha.');
    }
  };

  // Autenticar usuário com senha
  const authenticate = async () => {
    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (response.ok) {
        setAuthenticated(true);
      } else {
        alert(data.error || 'Erro na autenticação.');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      alert('Erro na autenticação.');
    }
  };

  // Gerar novas chaves
  const generateKeys = async () => {
    setIsGeneratingKeys(true);
    try {
      const response = await fetch('/api/generate-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size }),
      });

      const data = await response.json();

      if (response.ok) {
        const publicKey = [BigInt(data.publicKey.e), BigInt(data.publicKey.n)];
        const privateKey = [BigInt(data.privateKey.d), BigInt(data.privateKey.n)];

        setPublicKey(publicKey);
        setPrivateKey(privateKey);
      } else {
        alert(data.error || 'Erro ao gerar chaves.');
      }
    } catch (error) {
      console.error('Erro ao gerar chaves:', error);
      alert('Erro ao gerar chaves.');
    } finally {
      setIsGeneratingKeys(false);
    }
  };

  // Função para buscar chaves do banco de dados
  const fetchKeys = async () => {
    try {
      const response = await fetch('/api/list-keys');
      const data = await response.json();

      if (response.ok) {
        setKeyList(data.keys);
      } else {
        alert(data.error || 'Erro ao listar chaves.');
      }
    } catch (error) {
      console.error('Erro ao listar chaves:', error);
      alert('Erro ao listar chaves.');
    }
  };

  // Função para salvar chave no banco de dados
  const saveKeyToDatabase = async (e, n, d) => {
    try {
      const response = await fetch('/api/save-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ e, n, d }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Chave salva com sucesso.');
      } else {
        alert(data.error || 'Erro ao salvar a chave.');
      }
    } catch (error) {
      console.error('Erro ao salvar a chave:', error);
      alert('Erro ao salvar a chave.');
    }
  };

  // Função para excluir chave do banco de dados
  const deleteKeyFromDatabase = async (id) => {
    try {
      const response = await fetch(`/api/delete-key/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        alert('Chave excluída com sucesso.');
        // Atualizar a lista de chaves
        fetchKeys();
      } else {
        alert(data.error || 'Erro ao excluir a chave.');
      }
    } catch (error) {
      console.error('Erro ao excluir a chave:', error);
      alert('Erro ao excluir a chave.');
    }
  };

  const handleEncrypt = async () => {
    if (!publicKey || !message) {
      alert('Por favor, gere ou insira a chave pública e insira uma mensagem.');
      return;
    }

    try {
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          e: publicKey[0].toString(),
          n: publicKey[1].toString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEncryptedMessage(data.encryptedMessage);
      } else {
        alert(data.error || 'Erro ao criptografar a mensagem.');
      }
    } catch (error) {
      console.error('Erro ao criptografar:', error);
      alert('Erro ao criptografar a mensagem.');
    }
  };

  const handleDecrypt = async () => {
    if (!privateKey || !encryptedMessage) {
      alert('Por favor, gere ou insira a chave privada e insira a mensagem criptografada.');
      return;
    }

    try {
      const response = await fetch('/api/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          encryptedMessage: encryptedMessage,
          d: privateKey[0].toString(),
          n: privateKey[1].toString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDecryptedMessage(data.decryptedMessage);
      } else {
        alert(data.error || 'Erro ao descriptografar a mensagem.');
      }
    } catch (error) {
      console.error('Erro ao descriptografar:', error);
      alert('Erro ao descriptografar a mensagem.');
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#333',
      }}
    >
      {!isPasswordSet ? (
        <>
          <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Cadastrar Senha</h1>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Digite sua nova senha"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              color: '#333',
            }}
          />
          <button
            onClick={registerPassword}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Cadastrar Senha
          </button>
        </>
      ) : !authenticated ? (
        <>
          <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Autenticação</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              color: '#333',
            }}
          />
          <button
            onClick={authenticate}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Entrar
          </button>
        </>
      ) : (
        <>
          <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>GH msg / Um teste de RSA</h1>

          <h2 style={{ marginTop: '30px', color: '#333' }}>Escolha como obter a chave</h2>
          <select
            value={keyOption}
            onChange={(e) => {
              setKeyOption(e.target.value);
              // Limpar chaves e mensagens ao mudar de opção
              setPublicKey(null);
              setPrivateKey(null);
              setEncryptedMessage('');
              setDecryptedMessage('');
            }}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              color: '#FFF',
            }}
          >
            <option value="">Selecione uma opção</option>
            <option value="generate">Gerar nova chave</option>
            <option value="manual">Inserir chave existente</option>
            <option value="database">Carregar chave do banco de dados</option>
          </select>

          {/* Opções baseadas na seleção */}
          {keyOption === 'generate' && (
            <>
              <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
                Tamanho da chave (bits):
                <input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  placeholder="Tamanho da chave (em bits)"
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginTop: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    color: '#FFF',
                  }}
                />
              </label>
              <button
                onClick={generateKeys}
                style={{
                  padding: '10px 20px',
                  marginTop: '10px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                }}
                disabled={isGeneratingKeys}
              >
                {isGeneratingKeys ? 'Gerando Chaves...' : 'Gerar Chaves'}
              </button>

              {publicKey && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#e7f4e4',
                    borderRadius: '5px',
                    border: '1px solid #c7e1c7',
                    color: '#333',
                    wordWrap: 'break-word',
                  }}
                >
                  <strong>Chave Pública:</strong> e: {publicKey[0].toString()}, n: {publicKey[1].toString()}
                </div>
              )}

              {privateKey && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#f4f4f4',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    color: '#333',
                    wordWrap: 'break-word',
                  }}
                >
                  <strong>Chave Privada:</strong> d: {privateKey[0].toString()}, n: {privateKey[1].toString()}
                </div>
              )}

              {publicKey && privateKey && (
                <button
                  onClick={() => {
                    if (window.confirm('Deseja salvar esta chave no banco de dados?')) {
                      saveKeyToDatabase(publicKey[0].toString(), publicKey[1].toString(), privateKey[0].toString());
                    }
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f39c12',
                    color: '#fff',
                    border: 'none',
                    marginTop: '20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  Salvar Chave no Banco de Dados
                </button>
              )}
            </>
          )}

          {keyOption === 'manual' && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ color: '#333' }}>Inserir Chave Pública</h3>
              <input
                type="text"
                value={manualPublicKeyE}
                onChange={(e) => setManualPublicKeyE(e.target.value)}
                placeholder="Valor de e"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  color: '#FFF',
                }}
              />
              <input
                type="text"
                value={manualPublicKeyN}
                onChange={(e) => setManualPublicKeyN(e.target.value)}
                placeholder="Valor de n"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '20px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  color: '#FFF',
                }}
              />
              <h3 style={{ color: '#333' }}>Inserir Chave Privada</h3>
              <input
                type="text"
                value={manualPrivateKeyD}
                onChange={(e) => setManualPrivateKeyD(e.target.value)}
                placeholder="Valor de d"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  color: '#FFF',
                }}
              />
              <input
                type="text"
                value={manualPrivateKeyN}
                onChange={(e) => setManualPrivateKeyN(e.target.value)}
                placeholder="Valor de n"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '20px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  color: '#FFF',
                }}
              />
              <button
                onClick={() => {
                  try {
                    const e = BigInt(manualPublicKeyE);
                    const nPublic = BigInt(manualPublicKeyN);
                    const d = BigInt(manualPrivateKeyD);
                    const nPrivate = BigInt(manualPrivateKeyN);

                    if (nPublic !== nPrivate) {
                      alert('Os valores de n na chave pública e privada devem ser iguais.');
                      return;
                    }

                    setPublicKey([e, nPublic]);
                    setPrivateKey([d, nPrivate]);
                    alert('Chaves inseridas com sucesso!');
                  } catch (error) {
                    alert('Erro ao inserir chaves. Verifique os valores e tente novamente.');
                  }
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3498db',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Usar Chaves Inseridas
              </button>
            </div>
          )}

          {keyOption === 'database' && (
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={fetchKeys}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f39c12',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Listar Chaves do Banco de Dados
              </button>
              {keyList.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  {keyList.map((key) => (
                    <div
                      key={key.id}
                      style={{
                        padding: '10px',
                        backgroundColor: '#f4f4f4',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        marginBottom: '10px',
                        color: '#333',
                        wordWrap: 'break-word',
                      }}
                    >
                      <p>
                        <strong>ID:</strong> {key.id}
                      </p>
                      <p>
                        <strong>e:</strong> {key.e}
                      </p>
                      <p>
                        <strong>n:</strong> {key.n}
                      </p>
                      <p>
                        <strong>d:</strong> {key.d}
                      </p>
                      <button
                        onClick={() => {
                          setPublicKey([BigInt(key.e), BigInt(key.n)]);
                          setPrivateKey([BigInt(key.d), BigInt(key.n)]);
                          alert('Chave carregada com sucesso!');
                          // Limpar a lista de chaves
                          setKeyList([]);
                        }}
                        style={{
                          padding: '5px 10px',
                          marginTop: '10px',
                          backgroundColor: '#3498db',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginRight: '10px',
                        }}
                      >
                        Usar esta Chave
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Deseja excluir esta chave do banco de dados?')) {
                            deleteKeyFromDatabase(key.id);
                          }
                        }}
                        style={{
                          padding: '5px 10px',
                          marginTop: '10px',
                          backgroundColor: '#e74c3c',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Excluir esta Chave
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Componentes de Criptografia e Descriptografia */}
          {publicKey && (
            <>
              <h2 style={{ marginTop: '30px', color: '#333' }}>Criptografar Mensagem</h2>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite a mensagem"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '20px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  color: '#FFF',
                }}
              />
              <button
                onClick={handleEncrypt}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Criptografar
              </button>

              {encryptedMessage && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#e7f4e4',
                    borderRadius: '5px',
                    border: '1px solid #c7e1c7',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    wordWrap: 'break-word',
                    color: '#333',
                  }}
                >
                  <strong>Mensagem Criptografada:</strong>
                  <div style={{ marginTop: '10px' }}>{encryptedMessage}</div>
                </div>
              )}
            </>
          )}

          {privateKey && (
            <>
              <h2 style={{ marginTop: '30px', color: '#333' }}>Descriptografar Mensagem</h2>
              <input
                type="text"
                value={encryptedMessage}
                onChange={(e) => setEncryptedMessage(e.target.value)}
                placeholder="Digite a mensagem criptografada"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '20px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  color: '#FFF',
                }}
              />
              <button
                onClick={handleDecrypt}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Descriptografar
              </button>

              {decryptedMessage && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#e7f4e4',
                    borderRadius: '5px',
                    border: '1px solid #c7e1c7',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    wordWrap: 'break-word',
                    color: '#333',
                  }}
                >
                  <strong>Mensagem Descriptografada:</strong>
                  <div style={{ marginTop: '10px' }}>{decryptedMessage}</div>
                </div>
              )}
              <Footer />
            </>
          )}
        </>
      )}
    </div>
  );
}
